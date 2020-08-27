import Gate from './core/gate';
import { isConditionPassed } from './utils/validator';

const registerDirectives = (Vue) => {
  const directiveOptions = {
    inserted: isConditionPassed(Vue),
  };

  Vue.directive('permission', directiveOptions);
  Vue.directive('can', directiveOptions); // Alias for "v-permission"
  Vue.directive('role', directiveOptions);
  Vue.directive('role-or-permission', {
    inserted: (el, binding) => {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      }

      const values = binding.value.split('|');
      const role = values[0];
      const permission = values[1];

      if (
        !Vue.prototype.$gates.hasRole(role)
        && !Vue.prototype.$gates.hasPermission(permission)
      ) {
      // Remove DOM Element
        el.parentNode.removeChild(el);
      }
    },
  });
};

export default {
  install(Vue, options = {}) {
    const gate = new Gate(options);

    Vue.prototype.$gates = gate;
    Vue.gates = gate;

    registerDirectives(Vue);
  },
};
