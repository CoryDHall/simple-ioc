import { Container } from '../@types';

export const raiseMissingDependencyError: Container.ExceptionGenerator = (target, dep) => {
  throw new Error(`Class '${target.name}' requires a known implementation of '${String(dep)}'`);
};
export const raiseContainerError: Container.ExceptionGenerator = (klass, key) => {
  throw new Error(`Class '${klass.name}' is not a known implementation of '${String(key)}'`);
};
