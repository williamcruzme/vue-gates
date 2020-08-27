# ⚔ Methods

## Set roles and permissions

This should be the first step. When you log in or start the application, you must set the roles and permissions:

```javascript
this.$gates.setRoles(['writer']);
this.$gates.setPermissions(['posts.*', 'images.create']);

this.$gates.getRoles(); // ['writer']
this.$gates.getPermissions(); // ['posts.*', 'images.create']
```

## Directives as functions

You can also use the custom directives as functions.

```javascript
this.$gates.hasRole('admin'); // false
this.$gates.unlessRole('admin'); // true
this.$gates.hasAnyRole('admin|writer'); // true
this.$gates.hasAllRoles('admin|writer'); // false

this.$gates.hasPermission('posts.create'); // true
this.$gates.unlessPermission('posts.create'); // false
this.$gates.hasAnyPermission('posts.create|images'); // true
this.$gates.hasAllPermissions('posts.create|images.create'); // true
```
