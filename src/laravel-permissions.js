// Apply directive when condition is true
const when = condition => (el, binding) => {
  if (!binding.value) {
    console.error('You must specify a value in the directive.');
    return;
  }

  // Only allow this function to be run if the Laravel instance exists
  if (!window.Laravel) {
    return;
  }

  // Check if value exists in property value
  if (!condition(binding.value)) {
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
    window.Laravel = {
      ...window.Laravel,
      permissions: [],
      roles: [],
    };

    Vue.prototype.$laravel = {
      /*
      |-------------------------------------------------------------------------
      | Setters
      |-------------------------------------------------------------------------
      |
      | These functions controls the "permissions" and "roles" provided
      | by Laravel Permissions, or from a custom array.
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

      /*
      |-------------------------------------------------------------------------
      | Directives
      |-------------------------------------------------------------------------
      |
      | These is a group of functions for Vue Directives.
      | This is useful when you want valid a "permission" or "role"
      | programmatically.
      |
      */

      can: permission => window.Laravel.permissions.includes(permission),
      hasRole: role => window.Laravel.roles.includes(role),

      hasAnyPermission: (values) => {
        const permissions = values.split('|');
        return permissions.some(permission => window.Laravel.permissions.includes(permission));
      },

      hasAnyRole: (values) => {
        const roles = values.split('|');
        return roles.some(role => window.Laravel.roles.includes(role));
      },

      hasAllPermissions: (values) => {
        const permissions = values.split('|');
        return permissions.every(permission => window.Laravel.permissions.includes(permission));
      },

      hasAllRoles: (values) => {
        const roles = values.split('|');
        return roles.every(role => window.Laravel.roles.includes(role));
      },
    };

    Vue.directive('can', {
      inserted: when(Vue.prototype.$laravel.can),
    });

    Vue.directive('role', {
      inserted: when(Vue.prototype.$laravel.hasRole),
    });

    Vue.directive('hasanypermission', {
      inserted: when(Vue.prototype.$laravel.hasAnyPermission),
    });

    Vue.directive('hasanyrole', {
      inserted: when(Vue.prototype.$laravel.hasAnyRole),
    });

    Vue.directive('hasallpermissions', {
      inserted: when(Vue.prototype.$laravel.hasAllPermissions),
    });

    Vue.directive('hasallroles', {
      inserted: when(Vue.prototype.$laravel.hasAllRoles),
    });
  },
};
