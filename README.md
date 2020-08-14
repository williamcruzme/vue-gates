
<h1 align="center" style="text-align:center">Vue Gates - Protecting every thing</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/laravel-permissions"><img src="https://img.shields.io/npm/v/laravel-permissions.svg" alt="Version"></a>
  <a href="https://vuejs.org/"><img src="https://badgen.net/badge/Vue/2.x/orange" alt="Vue"></a>
  <a href="https://www.npmjs.com/package/laravel-permissions"><img src="https://img.shields.io/npm/dm/laravel-permissions.svg" alt="Downloads"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/laravel-permissions.svg" alt="License"></a>
</p>

vue-gates is a plugin for [Vue.js](https://vuejs.org/) & [Nuxt.js](https://nuxtjs.org/) that allows you to use [Laravel Permission](https://github.com/spatie/laravel-permission) in your components.

Being blade-based you only need to specify the directive in your components or DOM elements. The names of the directives are the same as those available in [Laravel Permission](https://github.com/spatie/laravel-permission#using-blade-directives), and EXTRA MORE!.

## 💿 Installation

#### yarn

```
yarn add vue-gates
```

#### npm

```
npm i vue-gates --save
```

#### CDN

vue-gates is also available on these CDNs:

- [jsdelivr](https://cdn.jsdelivr.net/npm/laravel-permissions@latest/dist/laravel-permissions.js)
- [unpkg](https://unpkg.com/laravel-permissions)

> When using a CDN via script tag, all the exported modules on VueGates are available on the VueGates Object.

## 🏁 Getting Started

In your script entry point:
```javascript
import Vue from 'vue';
import VueGates from 'vue-gates';

Vue.use(VueGates);
// OR
Vue.use(VueGates, { persistent: true });
```

Or in your Nuxt.js project 🎉:

**1. Create plugin:**
```js
// ~/plugins/laravel-permissions.js
import Vue from 'vue';
import VueGates from 'vue-gates';

Vue.use(VueGates);
// OR
Vue.use(VueGates, { persistent: true });
```

**2. Then register it:**
```js
// nuxt.config.js
export default {
  plugins: ['~/plugins/vue-gates']
}
```

Now you are all setup to use the plugin.

## 🚀 Usage

Apply the custom directive on your components or DOM elements. Make sure to [read the example](examples).

### Directives

#### Permissions

Check for a specific permission:

```vue
<button v-permission="'add articles'">Add Article</button>

<!-- Alias -->
<button v-can="'add articles'">Add Article</button>
```

Check for any permission in a list:

```vue
<button v-permission:any="'add articles|edit articles'">Configure</button>
```

Check for all permissions:

```vue
<button v-permission:all="'add articles|edit articles'">Configure</button>
```

Check for unless permission:

```vue
<p v-permission:unless="'add article'">You dont have permission!</p>
```

#### Roles

Check for a specific role:

```vue
<button v-role="'writer'">Add Article</button>
```

Check for any role in a list:

```vue
<button v-role:any="'writer|admin'">Add Article</button>
```

Check for all roles:

```vue
<button v-role:all="'writer|user'">Add Article</button>
```

Check for unless role:

```vue
<p v-role:unless="'super'">You are not an Super Admin!</p>
```

#### Roles & Permissions

Check for role and permission:

```vue
<button v-role="'writer'" v-permission="'add articles'">Add Article</button>

<!-- You can use any combination of directives -->
```

Check for role or permission:

```vue
<button v-role-or-permission="'super|add articles'">Add Article</button>
```

#### Working with attributes

 You can also set True to any attribute of DOM element if the condition is not met. You can set multiple attributes.

```vue
<button v-permission:has.disabled="'add articles'">Add Article</button>

<input v-role:any.required.autofocus="'admin|super admin'" />
```

### Methods

#### Set permissions and roles

This plugin searches the Laravel instance, by default it already creates it but you must define the permissions and roles:

```js
this.$gates.setPermissions(['add articles', 'edit articles']);
this.$gates.setRoles(['admin', 'user', 'writer']);

this.$gates.getPermissions(); // ['add articles', 'edit articles']
this.$gates.getRoles(); // ['admin', 'user', 'writer']
```

#### Directives as functions

You can also use the custom directives as functions.

```js
this.$gates.hasPermission('add articles'); // True
this.$gates.unlessPermission('add articles'); // False
this.$gates.hasAnyPermission('add articles|edit articles'); // True
this.$gates.hasAllPermissions('add articles|edit articles'); // True

this.$gates.hasRole('admin'); // True
this.$gates.unlessRole('admin'); // False
this.$gates.hasAnyRole('admin|writer'); // True
this.$gates.hasAllRoles('admin|writer'); // True
```

## ✅ Examples

See the [examples and instructions](examples) with Laravel.

## 🚸 Contributing

You are welcome to contribute to this project, but before you do, please make sure you read the [contribution guide](CONTRIBUTING.md).

## 🙈 Credits

- Inspired by Laravel Permission [syntax](https://github.com/spatie/laravel-permission#using-blade-directives).

## 🔒 License

MIT
