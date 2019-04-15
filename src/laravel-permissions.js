// Apply directive when condition is true
const when = condition => (el, binding) => {
  if (!binding.value) {
    console.error('You must specify a value in the directive.');
    return;
  }

  // Get property name based on directive name
  const property = binding.name === 'can' ? 'permissions' : 'roles';

  // Only allow this function to be run if the Laravel instance exists
  if (!window.Laravel || !Object.prototype.hasOwnProperty.call(window.Laravel, property)) {
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
  install(Vue) {
    window.Laravel = {};

    Vue.prototype.$laravel = {
      /*
      |-------------------------------------------------------------------------
      | Setters
      |-------------------------------------------------------------------------
      |
      | These functions controls the "permissions" and "roles" provided
      | by Laravel Permissions, or from a custom array. This plugin
      | is not working when "permissions" or "roles" is not defined.
      |
      */

      setPermissions: (permissions) => {
        window.Laravel.permissions = permissions;
      },

      setRoles: (roles) => {
        window.Laravel.roles = roles;
      },

      /*
      |-------------------------------------------------------------------------
      | Getters
      |-------------------------------------------------------------------------
      |
      | These functions return the "permissions" and "roles" stored.
      | This is useful when you want list all data.
      |
      */

      getPermissions: () => window.Laravel.permissions,
      getRoles: () => window.Laravel.roles,
    };

    Vue.directive('can', {
      inserted: when((permissions, permission) => permissions.includes(permission)),
    });

    Vue.directive('role', {
      inserted: when((roles, role) => roles.includes(role)),
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
  },
};
