# 📐 Install in Nuxt.js

In your Nuxt.js project:

**1. Create plugin:**

`~/plugins/vue-gates.js`:
```javascript
import Vue from 'vue'
import VueGates from 'vue-gates'

Vue.use(VueGates);

export default (_context, inject) => {
  inject('gates', Vue.prototype.$gates);
}
```

**2. Then register it:**

`nuxt.config.js`:
```javascript
export default {
  plugins: [
    '~/plugins/vue-gates'
  ]
}
```

*That's all!*
