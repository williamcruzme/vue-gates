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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  var pregQuote = function pregQuote(str) {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  };
  var match = function match(str, wildcard) {
    var regex = new RegExp("^".concat(wildcard.split(/\*+/).map(pregQuote).join('.*'), "$"), 'g');
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
      return _classPrivateFieldGet(_this, _superRole) && _classPrivateFieldGet(_this, _roles).includes(_classPrivateFieldGet(_this, _superRole));
    });

    _defineProperty(this, "hasRole", function (role) {
      return _this.isSuperUser() || _classPrivateFieldGet(_this, _roles).includes(role);
    });

    _defineProperty(this, "unlessRole", function (role) {
      return !_this.hasRole(role);
    });

    _defineProperty(this, "hasAnyRole", function (values) {
      if (_this.isSuperUser()) {
        return true;
      }

      var roles = values.split('|');
      return roles.some(function (role) {
        return _this.hasRole(role);
      });
    });

    _defineProperty(this, "hasAllRoles", function (values) {
      if (_this.isSuperUser()) {
        return true;
      }

      var roles = values.split('|');
      return roles.every(function (role) {
        return _this.hasRole(role);
      });
    });

    _defineProperty(this, "hasPermission", function (permission) {
      return _this.isSuperUser() || !!_classPrivateFieldGet(_this, _permissions).find(function (wildcard) {
        return match(permission, wildcard);
      });
    });

    _defineProperty(this, "unlessPermission", function (permission) {
      return !_this.hasPermission(permission);
    });

    _defineProperty(this, "hasAnyPermission", function (values) {
      if (_this.isSuperUser()) {
        return true;
      }

      var permissions = values.split('|');
      return permissions.some(function (permission) {
        return _this.hasPermission(permission);
      });
    });

    _defineProperty(this, "hasAllPermissions", function (values) {
      if (_this.isSuperUser()) {
        return true;
      }

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

  var parseCondition = function parseCondition(binding) {
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
  var isConditionPassed = function isConditionPassed(app, condition) {
    return function (el, binding) {
      if (!binding.value) {
        console.error('You must specify a value in the directive.');
        return;
      } // Get condition to validate


      var isValid = false;

      if (typeof condition === 'function') {
        isValid = condition(binding);
      } else {
        binding.name = condition; // Fix missing name property

        isValid = app.gates[parseCondition(binding)](binding.value);
      }

      if (!isValid) {
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

  var registerDirectives = function registerDirectives(app) {
    var newSyntax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var lifecycleName = newSyntax ? 'mounted' : 'inserted';

    var directiveOptions = function directiveOptions(condition) {
      return [condition, _defineProperty({}, lifecycleName, isConditionPassed(app, condition))];
    };

    app.directive.apply(app, _toConsumableArray(directiveOptions('role')));
    app.directive.apply(app, _toConsumableArray(directiveOptions('permission')));
    app.directive.apply(app, _toConsumableArray(directiveOptions('can'))); // Alias for "v-permission"

    app.directive('role-or-permission', _defineProperty({}, lifecycleName, isConditionPassed(app, function (binding) {
      var values = binding.value.split('|');
      var role = values[0];
      var permission = values[1];
      return app.gates.hasRole(role) || app.gates.hasPermission(permission);
    })));
  };

  var index = {
    install: function install(app) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var gate = new Gate(options);
      var isVue3 = !!app.config.globalProperties;

      if (isVue3) {
        app.config.globalProperties.$gates = gate;
      } else {
        app.prototype.$gates = gate;
      }

      app.gates = gate;
      registerDirectives(app, isVue3);
    }
  };

  return index;

})));
