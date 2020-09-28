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

export interface VueGatesOptions {
  persistent?: boolean;
  superRole?: string;
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
  // nuxtContext.app.$gates inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface Context {
    $gates: Gates;
  }
  // nuxtContext.$gates
  interface NuxtAppOptions {
    $gates: Gates;
  }
}

declare module 'vuex/types/index' {
  // this.$gates inside Vuex stores
  interface Store {
    $gates: Gates;
  }
}

declare class VueGates {
  install: (app: any, options?: VueGatesOptions) => void
}

export default VueGates;
