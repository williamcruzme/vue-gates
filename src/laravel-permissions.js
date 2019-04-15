import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';

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

      hasPermission: permission => window.Laravel.permissions.includes(permission),
      unlessPermission: permission => !Vue.prototype.$laravel.hasPermission(permission),

      hasAnyPermission: (values) => {
        const permissions = values.split('|');
        return permissions.some(permission => window.Laravel.permissions.includes(permission));
      },

      hasAllPermissions: (values) => {
        const permissions = values.split('|');
        return permissions.every(permission => window.Laravel.permissions.includes(permission));
      },

      hasRole: role => window.Laravel.roles.includes(role),
      unlessRole: role => !Vue.prototype.$laravel.hasRole(role),

      hasAnyRole: (values) => {
        const roles = values.split('|');
        return roles.some(role => window.Laravel.roles.includes(role));
      },

      hasAllRoles: (values) => {
        const roles = values.split('|');
        return roles.every(role => window.Laravel.roles.includes(role));
      },
    };

    // Normalize directive and call specific function
    const callFunctionFromDirective = (el, binding) => {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      }

      // Only allow this function to be run if the Laravel instance exists
      if (!window.Laravel) {
        return;
      }

      // Get property to validate
      let suffix = binding.name;
      let arg = 'has';

      if (binding.arg) {
        if (binding.arg === 'unless') {
          arg = 'unless';
        } else if (binding.arg !== 'has') {
          arg += startCase(binding.arg);
        }
      }

      // Convert to plural if is needed
      if (arg === 'hasAll') {
        suffix += 's';
      }

      // Get name of function to call
      const functionName = `${arg}${startCase(suffix)}`;

      // Check if value exists in property value
      if (!Vue.prototype.$laravel[functionName](binding.value)) {
        if (isEmpty(binding.modifiers)) {
          // Remove DOM Element
          el.parentNode.removeChild(el);
        } else {
          // Set modifiers on DOM element
          Object.assign(el, binding.modifiers);
        }
      }
    };

    Vue.directive('permission', { inserted: callFunctionFromDirective });
    Vue.directive('role', { inserted: callFunctionFromDirective });
  },
};
