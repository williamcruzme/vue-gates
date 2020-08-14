import { PluginFunction } from 'vue';

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
  interface Vue {
    $gates: Gates;
  }
interface VueConstructor {
    gates:  Gates;
  }
}

declare class VueGates {
  static install: PluginFunction<VueGatesOptions>;
}

export default VueGates;
