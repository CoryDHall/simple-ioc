import { ImpliedInterfaceKey } from '../@types';
import { extendWithDependencies } from '../helpers';

export function Depend(...args: ImpliedInterfaceKey[]) {
  return extendWithDependencies(args);
}
