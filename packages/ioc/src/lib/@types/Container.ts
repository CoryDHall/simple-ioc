import { Constructor } from './Constructor';
import { Dependent } from './Depend';
import { Implied } from './Implied';
import { ImpliedInterfaceKey } from './ImpliedInterfaceKey';

export namespace Container {
  export type RegisterInstantiator = <T extends Implied.IConstructor,
    R = T extends new(...args: infer U) => any ? U : never>(
    klass: T,
    argFn?: () => R) => void;

  export interface IContainer {
    registerType(key: ImpliedInterfaceKey): Container.RegisterInstantiator;
    resolve<T extends Dependent.IConstructor,
      C = T extends new(...args: infer U) => any ? U : never>(target: T): () => C;
  }
  export type ExceptionGenerator = (target: Constructor, dep: ImpliedInterfaceKey) => never
}
