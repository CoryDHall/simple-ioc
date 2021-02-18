import { __implications } from '../@symbols';
import { ImpliedInterfaceKey } from './ImpliedInterfaceKey';
import { Constructor } from './Constructor';

export namespace Implied {
  export interface InterfaceConstructor {
    [__implications](): ImpliedInterfaceKey[];
  }
  export type IConstructor = InterfaceConstructor & Constructor;

  export type ClassExtender = <T extends Constructor>(klass: T) => IConstructor;
  export type ExtensionFn = (implication: ImpliedInterfaceKey) => ClassExtender
}
