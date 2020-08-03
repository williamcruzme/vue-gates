import { isConditionPassed } from './utils';

export default {
  install(Vue, option = {}) {
    const canPersistent = option.persistent && process.browser;
    const permissions = canPersistent ? JSON.parse(localStorage.getItem('permissions')) : [];
    const roles = canPersistent ? JSON.parse(localStorage.getItem('roles')) : [];

    const Laravel = {
      permissions: permissions || [],
      roles: roles || [],
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
        if (canPersistent) {
          localStorage.setItem('permissions', JSON.stringify(permissions));
        }
      },

      setRoles: (roles) => {
        Laravel.roles = roles;
        if (canPersistent) {
          localStorage.setItem('roles', JSON.stringify(roles));
        }
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
    Vue.directive('can', { inserted: isConditionPassed(Vue) }); // Alias for "v-permission"
    Vue.directive('role', { inserted: isConditionPassed(Vue) });
    Vue.directive('role-or-permission', {
      inserted: (el, binding) => {
        if (!binding.value) {
          console.error('You must specify a value in the directive.');
          return;
        }

        const options = binding.value.split('|');
        const role = options[0];
        const permission = options[1];

        if (
          !Vue.prototype.$laravel.hasRole(role)
          && !Vue.prototype.$laravel.hasPermission(permission)
        ) {
          // Remove DOM Element
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};
