import { ImpliedInterfaceKey } from '../@types';
import { extendWithImplication } from '../helpers';

export function Imply(key: ImpliedInterfaceKey) {
  return extendWithImplication(key);
}
