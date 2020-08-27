# 🔧 Configuration

This packages has some useful options:

|    Name    |                                                                       Description                                                                        | Default |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| superRole  | Super role avoids all role and permission validations.                                                                                                   | `null`  |
| persistent | If the value is `true` then it will save the roles and permissions in `localStorage`, when the application reloads the values will be set automatically. | `false` |

```javascript
import Vue from 'vue';
import VueGates from 'vue-gates';

Vue.use(VueGates, {
  // Configuration
});
```
