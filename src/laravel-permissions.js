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
  }
};
