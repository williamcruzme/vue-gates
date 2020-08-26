# ⚔ Methods

## Set roles and permissions

This should be the first step. When you log in or start the application, you must set the roles and permissions:

```javascript
this.$gates.setRoles(['admin', 'user', 'writer']);
this.$gates.setPermissions(['add articles', 'edit articles']);

this.$gates.getRoles(); // ['admin', 'user', 'writer']
this.$gates.getPermissions(); // ['add articles', 'edit articles']
```

## Directives as functions

You can also use the custom directives as functions.

```javascript
this.$gates.hasRole('admin'); // true
this.$gates.unlessRole('admin'); // false
this.$gates.hasAnyRole('admin|writer'); // true
this.$gates.hasAllRoles('admin|writer'); // true

this.$gates.hasPermission('add articles'); // true
this.$gates.unlessPermission('add articles'); // false
this.$gates.hasAnyPermission('add articles|edit articles'); // true
this.$gates.hasAllPermissions('add articles|edit articles'); // true
```
