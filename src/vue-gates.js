import { isConditionPassed } from './utils';

export default {
  install(Vue, option = {}) {
    const canPersistent = option.persistent && process.browser;
    const permissions = canPersistent ? JSON.parse(localStorage.getItem('permissions')) : [];
    const roles = canPersistent ? JSON.parse(localStorage.getItem('roles')) : [];

    const Gate = {
      permissions: permissions || [],
      roles: roles || [],
      superRole: option.superRole,
    };

    Vue.prototype.$gate = {
      /*
      |-------------------------------------------------------------------------
      | Setters
      |-------------------------------------------------------------------------
      |
      | These functions controls the "permissions" and "roles" provided
      | by Vue Gates, or from a custom array.
      |
      */

      setPermissions: (permissions) => {
        Gate.permissions = permissions;
        if (canPersistent) {
          localStorage.setItem('permissions', JSON.stringify(permissions));
        }
      },

      setRoles: (roles) => {
        Gate.roles = roles;
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

      getPermissions: () => Gate.permissions,
      getRoles: () => Gate.roles,
      isSuperUser: () => Gate.superRole && Gate.roles.includes(Gate.superRole),

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
      hasPermission: permission => Gate.permissions.includes(permission),
      unlessPermission: permission => !Vue.prototype.$gate.hasPermission(permission),

      hasAnyPermission: (values) => {
        const permissions = values.split('|');
        return permissions.some(permission => Gate.permissions.includes(permission));
      },

      hasAllPermissions: (values) => {
        const permissions = values.split('|');
        return permissions.every(permission => Gate.permissions.includes(permission));
      },

      // Roles
      hasRole: role => Gate.roles.includes(role),
      unlessRole: role => !Vue.prototype.$gate.hasRole(role),

      hasAnyRole: (values) => {
        const roles = values.split('|');
        return roles.some(role => Gate.roles.includes(role));
      },

      hasAllRoles: (values) => {
        const roles = values.split('|');
        return roles.every(role => Gate.roles.includes(role));
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
          !Vue.prototype.$gate.hasRole(role)
          && !Vue.prototype.$gate.hasPermission(permission)
        ) {
          // Remove DOM Element
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};
