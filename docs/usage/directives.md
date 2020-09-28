# ✨ Directives

The directive will validate the roles and permissions. It will create or destroy the component or DOM element whether or not it meets the condition 😎

## Roles

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

## Permissions

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

## Roles & Permissions

Check for role and permission:

```vue
<button v-role="'writer'" v-permission="'add articles'">Add Article</button>

<!-- You can use any combination of directives -->
```

Check for role or permission:

```vue
<button v-role-or-permission="'super|add articles'">Add Article</button>
```

## Working with attributes

 You can also set `true` to any attribute of DOM element if the condition is not met. You can set multiple attributes.

```vue
<button v-permission:has.disabled="'add articles'">Add Article</button>

<input v-role.required.autofocus="'admin'" />
<input v-role:any.required.autofocus="'admin|super admin'" />
```
