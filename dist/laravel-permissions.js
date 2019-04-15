(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.LaravelPermissions = factory());
}(this, function () { 'use strict';

  // Apply directive when condition is true
  var when = function when(condition) {
    return function (el, binding) {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      } // Get property name based on directive name


      var property = binding.name === 'can' ? 'permissions' : 'roles'; // Only allow this function to be run if the Laravel instance exists

      if (!window.Laravel || !Object.prototype.hasOwnProperty.call(window.Laravel, property)) {
        return;
      } // Check if value exists in property value


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
  };

  var laravelPermissions = {
    install: function install(Vue) {
      window.Laravel = {};
      Vue.prototype.$laravel = {
        setPermissions: function setPermissions(permissions) {
          window.Laravel.permissions = permissions;
        },
        getPermissions: function getPermissions() {
          return window.Laravel.permissions;
        },
        setRoles: function setRoles(roles) {
          window.Laravel.roles = roles;
        },
        getRoles: function getRoles() {
          return window.Laravel.roles;
        }
      };
      Vue.directive('can', {
        inserted: when(function (permissions, permission) {
          return permissions.includes(permission);
        })
      });
      Vue.directive('role', {
        inserted: when(function (roles, role) {
          return roles.includes(role);
        })
      });
      Vue.directive('hasanyrole', {
        inserted: when(function (current, value) {
          var values = value.split('|');
          return values.some(function (value) {
            return current.includes(value);
          });
        })
      });
      Vue.directive('hasallroles', {
        inserted: when(function (current, value) {
          var values = value.split('|');
          return values.every(function (value) {
            return current.includes(value);
          });
        })
      });
    }
  };

  return laravelPermissions;

}));
