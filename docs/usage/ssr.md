# 🍳 Server Side Rendering

## The asyncData Method

You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method that lets you handle async operations before setting the component data.

`pages/secret.vue`:
```javascript
export default {
  async asyncData ({ $axios, $gates }) {
    const [roles, permissions] = await Promise.all([
      $axios.$get('/api/roles'),
      $axios.$get('/api/permissions')
    ])

    $gates.setRoles(roles)
    $gates.setPermissions(permissions)
  }
}
```

To learn more about the asyncData, see the [official Nuxt documentation](https://nuxtjs.org/api).

## The nuxtServerInit Action

If the action `nuxtServerInit` is defined in the store and the mode is `universal`, Nuxt.js will call it with the context (only from the server-side). It's useful when we have some data on the server we want to give directly to the client-side.

For example, let's say we have sessions on the server-side and we can access the connected user through `req.session.user`. To give the authenticated user to our store, we update our `store/index.js` to the following:

```javascript
actions: {
  nuxtServerInit ({ commit }, { req, $gates }) {
    const user = req.session.user
    if (user) {
      $gates.setRoles(user.roles)
      $gates.setPermissions(user.permissions)

      commit('user', user)
    }
  }
}
```

To learn more about the nuxtServerInit, see the [official Nuxt documentation](https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action).
