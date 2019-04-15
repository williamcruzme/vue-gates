# Laravel Example

This is a example for Laravel implementation. This requires [Laravel Permissions](https://github.com/spatie/laravel-permission) installed and [configured](https://github.com/spatie/laravel-permission#usage).

## Steps

### Step 1: Add functions to UserController

The frontend needs to know the permissions and roles assigned, for this purpose two endpoints are created that return this information.

```php
/**
 * Display a listing of permissions from current logged user.
 *
 * @return \Illuminate\Http\JsonResponse
 */
public function permissions()
{
    return auth()->user()->getAllPermissions()->pluck('name');
}

/**
 * Display a listing of roles from current logged user.
 *
 * @return \Illuminate\Http\JsonResponse
 */
public function roles()
{
    return auth()->user()->getRoleNames();
}
```

### Step 2: Define routes

These two routes should only be accessed when you are authenticated.

```php
Route::get('permissions', 'UserController@permissions');
Route::get('roles', 'UserController@roles');
```

### Step 3: Use plugin

The plugin creates an instance of Laravel accessible globally, and at the same time it registers all the directives.

```js
import Vue from 'vue'
import LaravelPermissions from 'laravel-permissions'

Vue.use(LaravelPermissions);
```

### Step 4: Set permissions and roles

```js
const { data: permissions } = await axios.get('/api/permissions');
const { data: roles } = await axios.get('/api/roles');

this.$laravel.setPermissions(permissions);
this.$laravel.setRoles(roles);
```

### Finish!

That is all. Now you can start using the directives.
