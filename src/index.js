import Gate from './core/gate';
import { isConditionPassed } from './utils/validator';

const registerDirectives = (app, newSyntax = false) => {
  const directiveOptions = {
    [newSyntax ? 'mounted' : 'inserted']: isConditionPassed(app),
  };

  app.directive('permission', directiveOptions);
  app.directive('can', directiveOptions); // Alias for "v-permission"
  app.directive('role', directiveOptions);
  app.directive('role-or-permission', {
    inserted: (el, binding) => {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      }

      const values = binding.value.split('|');
      const role = values[0];
      const permission = values[1];

      if (
        !app.gates.hasRole(role)
        && !app.gates.hasPermission(permission)
      ) {
      // Remove DOM Element
        el.parentNode.removeChild(el);
      }
    },
  });
};

export default {
  install: (app, options = {}) => {
    const gate = new Gate(options);
    const isVue3 = !!app.config;

    if (isVue3) {
      app.config.globalProperties.$gates = gate;
    } else {
      app.prototype.$gates = gate;
    }

    app.gates = gate;

    registerDirectives(app, isVue3);
  },
};
