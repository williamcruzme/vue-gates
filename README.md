
# Laravel Permissions

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/76f6b99f5836453aa24720f03078f536)](https://www.codacy.com/app/williamcruzme/laravel-permissions?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=williamcruzme/laravel-permissions&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/laravel-permissions.svg)](https://www.npmjs.com/package/laravel-permissions)

<br>

laravel-permissions is a plugin for [Vue.js 2](https://vuejs.org/) that allows you to use [Laravel Permissions](https://github.com/spatie/laravel-permission) in your components.

Being blade-based you only need to specify the directive in your components or DOM elements. The names of the directives are the same as those available in [Laravel Permissions](https://github.com/spatie/laravel-permission#using-blade-directives).

### Installation

#### yarn

```
yarn add laravel-permissions
```

#### npm

```
npm i laravel-permissions --save
```

#### CDN

laravel-permissions is also available on these CDNs:

- [jsdelivr](https://cdn.jsdelivr.net/npm/laravel-permissions@latest/dist/laravel-permissions.min.js)
- [unpkg](https://unpkg.com/laravel-permissions)

> When using a CDN via script tag, all the exported modules on LaravelPermissions are available on the LaravelPermissions Object.

### Getting Started

In your script entry point:
```javascript
import Vue from 'vue';
import LaravelPermissions from 'laravel-permissions';

Vue.use(LaravelPermissions);
```

Now you are all setup to use the plugin.

### Usage

Apply the custom directive on your components or DOM elements. Make sure to [read the example](examples).

#### Directives

Check for a specific permission:

```vue
<button v-can="'add articles'">Add Article</button>
```

Check for a specific role:

```vue
<button v-role="'writer'">Add Article</button>
```

Check for any role in a list:

```vue
<button v-hasanyrole="'writer|admin'">Add Article</button>
```

Check for all roles:

```vue
<button v-hasallroles="'writer|user'">Add Article</button>
```
#### Working with custom properties

 You can also set True to any property if the condition is not met.

```vue
<button v-can:disabled="'add articles'">Add Article</button>

<CustomComponent v-can:customProperty="'add articles'" />
```

#### Set permissions and roles

This plugin searches the Laravel instance, by default it already creates it but you must define the permissions and roles:

```js
this.$laravel.setPermissions(['add articles', 'edit articles']);
this.$laravel.setRoles(['admin', 'user', 'writer']);

this.$laravel.getPermissions(); // ['add articles', 'edit articles']
this.$laravel.getRoles(); // ['admin', 'user', 'writer']
```

### Examples

See the [examples and instructions](examples) with Laravel.

### Contributing

You are welcome to contribute to this project, but before you do, please make sure you read the [contribution guide](CONTRIBUTING.md).

### Credits

- Inspired by Laravel's [permissions syntax](https://github.com/spatie/laravel-permission#using-blade-directives).

### License

MIT
