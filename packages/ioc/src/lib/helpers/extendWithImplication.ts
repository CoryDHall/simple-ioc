import { Implied } from '../@types';
import { __implications } from '../@symbols';

const STUB_EMPTY = (() => []);

export const extendWithImplication: Implied.ExtensionFn = implication => {
  return target => class extends target {
    static [__implications]() {
      const parent = super[__implications] || STUB_EMPTY;

      return [implication, parent()];
    }
  };
};
