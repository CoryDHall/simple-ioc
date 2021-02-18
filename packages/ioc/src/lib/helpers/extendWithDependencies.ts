import { Dependent } from '../@types';
import { __dependencies } from '../@symbols';

export const extendWithDependencies: Dependent.ExtensionFn = dependencies => {
  return target => class extends target {
    static [__dependencies]() {
      return dependencies;
    }
  };
};
