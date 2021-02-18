import { Container, ImpliedInterfaceKey } from './@types';
import {
  getDependencies,
  isImpliedBy,
  raiseContainerError,
  raiseMissingDependencyError,
} from './helpers';


const invoke = (i: () => any) => i();

export class IOCContainer implements Container.IContainer {
  private dict: Map<ImpliedInterfaceKey, any> = new Map();
  registerType(key) {
    const typeValidate = isImpliedBy(key);

    return (klass, argFn = () => undefined) => {
      if (!typeValidate(klass)) raiseContainerError(klass, key);

      this.dict.set(key, () => new klass(...[].concat(argFn())));
    };
  }
  resolve(target) {
    const deps = getDependencies(target);
    const instantiators = deps.map(dep => {
      if (!this.dict.has(dep)) raiseMissingDependencyError(target, dep);

      return this.dict.get(dep);
    });

    return () => new target(...instantiators.map(invoke));
  }
}
