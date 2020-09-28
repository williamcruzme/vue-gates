import Gate from './core/gate';
import { isConditionPassed } from './utils/validator';

const registerDirectives = (app, newSyntax = false) => {
  const lifecycleName = newSyntax ? 'mounted' : 'inserted';
  const directiveOptions = (condition) => [condition, {
    [lifecycleName]: isConditionPassed(app, condition),
  }];

  app.directive(...directiveOptions('role'));
  app.directive(...directiveOptions('permission'));
  app.directive(...directiveOptions('can')); // Alias for "v-permission"
  app.directive('role-or-permission', {
    [lifecycleName]: isConditionPassed(app, (binding) => {
      const values = binding.value.split('|');
      const role = values[0];
      const permission = values[1];

      return app.gates.hasRole(role) || app.gates.hasPermission(permission);
    }),
  });
};

export default {
  install: (app, options = {}) => {
    const gate = new Gate(options);
    const isVue3 = !!app.config.globalProperties;

    if (isVue3) {
      app.config.globalProperties.$gates = gate;
    } else {
      app.prototype.$gates = gate;
    }

    app.gates = gate;

    registerDirectives(app, isVue3);
  },
};
