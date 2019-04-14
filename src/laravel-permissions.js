// Apply directive when condition is true
const when = (condition) => (el, binding) => {
  if (!binding.value) {
    return console.error('You must specify a value in the directive.');
  }

  // Get property name based on directive name
  const property = binding.name === 'can' ? 'permissions' : 'roles';

  // Only allow this function to be run if the Laravel instance exists
  if (!window.Laravel || !window.Laravel.hasOwnProperty(property)) {
    return;
  }

  // Check if value exists in property value
  if (!condition(window.Laravel[property], binding.value)) {
    if (!binding.arg) {
      // Remove DOM Element
      el.parentNode.removeChild(el);
    } else {
      // Set 'true' custom property
      el[binding.arg] = true;
    }
  }
};

export default {
  install(Vue, _options) {
    window.Laravel = {};

    Vue.prototype.$laravel = {
      setPermissions: (permissions) => {
        window.Laravel.permissions = permissions;
      },

      getPermissions: () => window.Laravel.permissions,

      setRoles: (roles) => {
        window.Laravel.roles = roles;
      },

      getRoles: () => window.Laravel.roles,
    };

    Vue.directive('can', {
      inserted: when((current, value) => current.includes(value)),
    });

    Vue.directive('role', {
      inserted: when((current, value) => current.includes(value)),
    });

    Vue.directive('hasanyrole', {
      inserted: when((current, value) => {
        const values = value.split('|');
        return values.some(value => current.includes(value));
      }),
    });

    Vue.directive('hasallroles', {
      inserted: when((current, value) => {
        const values = value.split('|');
        return values.every(value => current.includes(value));
      }),
    });
  }
};
