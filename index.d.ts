declare class Gates {
  setRoles: (roles: Array<string>) => void;
  setPermissions: (permissions: Array<string>) => void;
  getRoles(): Array<string>;
  getPermissions(): Array<string>;
  isSuperUser(): boolean;
  hasRole(role: string): boolean;
  unlessRole(role: string): boolean;
  hasAnyRole(values: string): boolean;
  hasAllRoles(values: string): boolean;
  hasPermission(permission: string): boolean;
  unlessPermission(permission: string): boolean;
  hasAnyPermission(values: string): boolean;
  hasAllPermissions(values: string): boolean;
}

declare module '@vue/runtime-core' {
  // Vue 3
  interface ComponentCustomProperties  {
    $gates: Gates
  }
}

declare module 'vue/types/vue' {
  // this.$gates inside Vue components
  interface Vue {
    $gates: Gates;
  }
  interface VueConstructor {
    gates: Gates;
  }
}

declare module '@nuxt/types' {
  // context.app.$gates inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface Context {
    $gates: Gates;
  }
  // context.$gates
  interface NuxtAppOptions {
    $gates: Gates;
  }
}

declare module 'vuex/types/index' {
  // this.$gates inside Vuex store
  interface Store<S> {
    $gates: Gates;
  }
}

export interface VueGatesOptions {
  persistent?: boolean;
  superRole?: string;
}

declare class VueGates {
  install: (app: any, options?: VueGatesOptions) => void;
  [key: string]: any;
}

export default VueGates;
