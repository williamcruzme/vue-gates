import Gate from './core/gate';
import { isConditionPassed } from './utils/validator';

const registerDirectives = (app) => {
  const directiveOptions = {
    inserted: isConditionPassed(app),
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
        !app.prototype.$gates.hasRole(role)
        && !app.prototype.$gates.hasPermission(permission)
      ) {
      // Remove DOM Element
        el.parentNode.removeChild(el);
      }
    },
  });
};

export default {
  install: (app, options) => {
    const gate = new Gate(options);

    app.config.globalProperties.$gates = gate;
    app.gates = gate;

    registerDirectives(app);
  },
};
