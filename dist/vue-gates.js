(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueGates = {}));
}(this, (function (exports) { 'use strict';

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

  var startCase = function (str) { return ("" + (str.charAt(0).toUpperCase()) + (str.slice(1))); };
  var isEmpty = function (obj) { return Object.keys(obj).length === 0; };
  var pregQuote = function (str, delimiter) {
    var regex = new RegExp(("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\" + (delimiter || '') + "-]"), 'g');
    return ("" + str).replace(regex, '\\$&');
  };
  var match = function (str, wildcard) {
    var regex = new RegExp(pregQuote(wildcard).replace(/\\\*/g, '.*').replace(/\\\?/g, '.'), 'g');
    return str.match(regex);
  };

  var _canPersistent = new WeakMap();

  var _roles = new WeakMap();

  var _permissions = new WeakMap();

  var _superRole = new WeakMap();

  var Gate = function Gate(options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

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
      _classPrivateFieldSet(this$1, _roles, roles);

      if (_classPrivateFieldGet(this$1, _canPersistent)) {
        localStorage.setItem('roles', JSON.stringify(roles));
      }
    });

    _defineProperty(this, "setPermissions", function (permissions) {
      _classPrivateFieldSet(this$1, _permissions, permissions);

      if (_classPrivateFieldGet(this$1, _canPersistent)) {
        localStorage.setItem('permissions', JSON.stringify(permissions));
      }
    });

    _defineProperty(this, "getRoles", function () { return _classPrivateFieldGet(this$1, _roles); });

    _defineProperty(this, "getPermissions", function () { return _classPrivateFieldGet(this$1, _permissions); });

    _defineProperty(this, "isSuperUser", function () { return _classPrivateFieldGet(this$1, _superRole) && this$1.hasRole(_classPrivateFieldGet(this$1, _superRole)); });

    _defineProperty(this, "hasRole", function (role) { return _classPrivateFieldGet(this$1, _roles).includes(role); });

    _defineProperty(this, "unlessRole", function (role) { return !this$1.hasRole(role); });

    _defineProperty(this, "hasAnyRole", function (values) {
      var roles = values.split('|');
      return roles.some(function (role) { return this$1.hasRole(role); });
    });

    _defineProperty(this, "hasAllRoles", function (values) {
      var roles = values.split('|');
      return roles.every(function (role) { return this$1.hasRole(role); });
    });

    _defineProperty(this, "hasPermission", function (permission) { return !!_classPrivateFieldGet(this$1, _permissions).find(function (wildcard) { return match(permission, wildcard); }); });

    _defineProperty(this, "unlessPermission", function (permission) { return !this$1.hasPermission(permission); });

    _defineProperty(this, "hasAnyPermission", function (values) {
      var permissions = values.split('|');
      return permissions.some(function (permission) { return this$1.hasPermission(permission); });
    });

    _defineProperty(this, "hasAllPermissions", function (values) {
      var permissions = values.split('|');
      return permissions.every(function (permission) { return this$1.hasPermission(permission); });
    });

    var canPersistent = options.persistent && process.browser;

    var _roles2 = canPersistent ? JSON.parse(localStorage.getItem('roles')) : [];

    var _permissions2 = canPersistent ? JSON.parse(localStorage.getItem('permissions')) : [];

    _classPrivateFieldSet(this, _canPersistent, canPersistent);

    _classPrivateFieldSet(this, _roles, _roles2);

    _classPrivateFieldSet(this, _permissions, _permissions2);

    _classPrivateFieldSet(this, _superRole, options.superRole);
  };

  var getCondition = function (binding) {
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

    return ("" + arg + (startCase(suffix)));
  };
  var isConditionPassed = function (Vue) { return function (el, binding) {
    if (!binding.value) {
      console.error('You must specify a value in the directive.');
      return;
    } // Check if it's a superuser.


    if (Vue.prototype.$gates.isSuperUser()) {
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
  }; };

  //
  var script = {
    data: function data() {
      return {
        condition: false
      };
    },

    created: function created() {
      var this$1 = this;

      // Watch all attrs
      this.$watch(function (vm) { return Object.keys(this$1.$attrs).map(function (attr) { return vm[attr]; }); }, function () {
        console.log('Update!');
      });
      Object.keys(this.$attrs).forEach(function (attr) { return this$1.processCondition(attr, this$1.$attrs[attr]); });
    },

    methods: {
      processCondition: function processCondition(attr, value) {
        console.log(attr, value);
        var condition = attr.split(':');
        var binding = {
          name: condition[0],
          arg: condition === null || condition === void 0 ? void 0 : condition[1]
        };
        console.log(getCondition(binding));
      }

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.condition)?_vm._t("default"):_vm._e()],2)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  var registerDirectives = function (Vue) {
    var directiveOptions = {
      inserted: isConditionPassed(Vue)
    };
    Vue.component('Gate', __vue_component__);
    Vue.directive('permission', directiveOptions);
    Vue.directive('can', directiveOptions); // Alias for "v-permission"

    Vue.directive('role', directiveOptions);
    Vue.directive('role-or-permission', {
      inserted: function (el, binding) {
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
    install: function install(Vue, options) {
      if ( options === void 0 ) options = {};

      var gate = new Gate(options);
      Vue.prototype.$gates = gate;
      Vue.gates = gate;
      registerDirectives(Vue);
    }

  };

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
