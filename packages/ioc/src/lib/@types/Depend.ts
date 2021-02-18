import { __dependencies } from '../@symbols';
import { Constructor } from './Constructor';
import { ImpliedInterfaceKey } from './ImpliedInterfaceKey';

export namespace Dependent {

  export interface IDependantConstructor {
    [__dependencies](): ImpliedInterfaceKey[];
  }
  export type IConstructor = IDependantConstructor & Constructor;

  export type ClassExtender = <T extends Constructor>(any: T) => IConstructor;
  export type ExtensionFn = (dependencies: ImpliedInterfaceKey[]) => ClassExtender
}
