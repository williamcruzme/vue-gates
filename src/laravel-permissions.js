import { isConditionPassed } from './utils';

export default {
  install(Vue) {
    const Laravel = {
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
        Laravel.permissions = permissions;
      },

      setRoles: (roles) => {
        Laravel.roles = roles;
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

      getPermissions: () => Laravel.permissions,
      getRoles: () => Laravel.roles,

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

      // Permissions
      hasPermission: permission => Laravel.permissions.includes(permission),
      unlessPermission: permission => !Vue.prototype.$laravel.hasPermission(permission),

      hasAnyPermission: (values) => {
        const permissions = values.split('|');
        return permissions.some(permission => Laravel.permissions.includes(permission));
      },

      hasAllPermissions: (values) => {
        const permissions = values.split('|');
        return permissions.every(permission => Laravel.permissions.includes(permission));
      },

      // Roles
      hasRole: role => Laravel.roles.includes(role),
      unlessRole: role => !Vue.prototype.$laravel.hasRole(role),

      hasAnyRole: (values) => {
        const roles = values.split('|');
        return roles.some(role => Laravel.roles.includes(role));
      },

      hasAllRoles: (values) => {
        const roles = values.split('|');
        return roles.every(role => Laravel.roles.includes(role));
      },
    };

    // Directives
    Vue.directive('permission', { inserted: isConditionPassed(Vue) });
    Vue.directive('role', { inserted: isConditionPassed(Vue) });

    // Alias for "v-permission:has"
    Vue.directive('can', {
      inserted: (el, binding) => {
        if (!Vue.prototype.$laravel.hasPermission(binding.value)) {
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};
