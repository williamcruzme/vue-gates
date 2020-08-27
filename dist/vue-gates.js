(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueGates = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  var startCase = function startCase(str) {
    return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1));
  };
  var isEmpty = function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  };
  var pregQuote = function pregQuote(str, delimiter) {
    var regex = new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\".concat(delimiter || '', "-]"), 'g');
    return "".concat(str).replace(regex, '\\$&');
  };
  var match = function match(str, wildcard) {
    var regex = new RegExp(pregQuote(wildcard).replace(/\\\*/g, '.*').replace(/\\\?/g, '.'), 'g');
    return str.match(regex);
  };

  var _canPersistent = new WeakMap();

  var _roles = new WeakMap();

  var _permissions = new WeakMap();

  var _superRole = new WeakMap();

  var Gate = function Gate() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Gate);

    _canPersistent.set(this, {
      writable: true,
      value: false
    });

    _roles.set(this, {
      writable: true,
      value: []
    });

    _permissions.set(this, {
      writable: true,
      value: []
    });

    _superRole.set(this, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setRoles", function (roles) {
      _classPrivateFieldSet(_this, _roles, roles);

      if (_classPrivateFieldGet(_this, _canPersistent)) {
        localStorage.setItem('roles', JSON.stringify(roles));
      }
    });

    _defineProperty(this, "setPermissions", function (permissions) {
      _classPrivateFieldSet(_this, _permissions, permissions);

      if (_classPrivateFieldGet(_this, _canPersistent)) {
        localStorage.setItem('permissions', JSON.stringify(permissions));
      }
    });

    _defineProperty(this, "getRoles", function () {
      return _classPrivateFieldGet(_this, _roles);
    });

    _defineProperty(this, "getPermissions", function () {
      return _classPrivateFieldGet(_this, _permissions);
    });

    _defineProperty(this, "isSuperUser", function () {
      return _classPrivateFieldGet(_this, _superRole) && _this.hasRole(_classPrivateFieldGet(_this, _superRole));
    });

    _defineProperty(this, "hasRole", function (role) {
      return !!_classPrivateFieldGet(_this, _roles).find(function (wildcard) {
        return match(role, wildcard);
      });
    });

    _defineProperty(this, "unlessRole", function (role) {
      return !_this.hasRole(role);
    });

    _defineProperty(this, "hasAnyRole", function (values) {
      var roles = values.split('|');
      return roles.some(function (role) {
        return _this.hasRole(role);
      });
    });

    _defineProperty(this, "hasAllRoles", function (values) {
      var roles = values.split('|');
      return roles.every(function (role) {
        return _this.hasRole(role);
      });
    });

    _defineProperty(this, "hasPermission", function (permission) {
      return !!_classPrivateFieldGet(_this, _permissions).find(function (wildcard) {
        return match(permission, wildcard);
      });
    });

    _defineProperty(this, "unlessPermission", function (permission) {
      return !_this.hasPermission(permission);
    });

    _defineProperty(this, "hasAnyPermission", function (values) {
      var permissions = values.split('|');
      return permissions.some(function (permission) {
        return _this.hasPermission(permission);
      });
    });

    _defineProperty(this, "hasAllPermissions", function (values) {
      var permissions = values.split('|');
      return permissions.every(function (permission) {
        return _this.hasPermission(permission);
      });
    });

    var canPersistent = options.persistent && process.browser;

    var _roles2 = canPersistent ? JSON.parse(localStorage.getItem('roles')) : [];

    var _permissions2 = canPersistent ? JSON.parse(localStorage.getItem('permissions')) : [];

    _classPrivateFieldSet(this, _canPersistent, canPersistent);

    _classPrivateFieldSet(this, _roles, _roles2);

    _classPrivateFieldSet(this, _permissions, _permissions2);

    _classPrivateFieldSet(this, _superRole, options.superRole);
  }
  /*
  |-------------------------------------------------------------------------
  | Setters
  |-------------------------------------------------------------------------
  |
  | These functions controls the "permissions" and "roles" provided
  | by Vue Gates, or from a custom array.
  |
  */
  ;

  var getCondition = function getCondition(binding) {
    var suffix = binding.name === 'can' ? 'permission' : binding.name;
    var arg = 'has';

    if (binding.arg) {
      if (binding.arg === 'unless') {
        arg = 'unless';
      } else if (binding.arg !== 'has') {
        arg += startCase(binding.arg);
      }
    } // Convert to plural if is needed


    if (arg === 'hasAll') {
      suffix += 's';
    }

    return "".concat(arg).concat(startCase(suffix));
  };
  var isConditionPassed = function isConditionPassed(Vue) {
    return function (el, binding) {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      } // Check if it's a superuser.


      var isSuperUser = Vue.prototype.$gates.isSuperUser();

      if (isSuperUser) {
        return;
      } // Get condition to validate


      var condition = getCondition(binding);

      if (!Vue.prototype.$gates[condition](binding.value)) {
        if (isEmpty(binding.modifiers)) {
          // Remove DOM Element
          el.parentNode.removeChild(el);
        } else {
          // Set attributes to DOM element
          Object.assign(el, binding.modifiers);
        }
      }
    };
  };

  var registerDirectives = function registerDirectives(Vue) {
    var directiveOptions = {
      inserted: isConditionPassed(Vue)
    };
    Vue.directive('permission', directiveOptions);
    Vue.directive('can', directiveOptions); // Alias for "v-permission"

    Vue.directive('role', directiveOptions);
    Vue.directive('role-or-permission', {
      inserted: function inserted(el, binding) {
        if (!binding.value) {
          console.error('You must specify a value in the directive.');
          return;
        }

        var values = binding.value.split('|');
        var role = values[0];
        var permission = values[1];

        if (!Vue.prototype.$gates.hasRole(role) && !Vue.prototype.$gates.hasPermission(permission)) {
          // Remove DOM Element
          el.parentNode.removeChild(el);
        }
      }
    });
  };

  var index = {
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var gate = new Gate(options);
      Vue.prototype.$gates = gate;
      Vue.gates = gate;
      registerDirectives(Vue);
    }
  };

  return index;

})));
