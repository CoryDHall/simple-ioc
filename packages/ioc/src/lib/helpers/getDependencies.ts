import { Dependent, ImpliedInterfaceKey } from '../@types';
import { __dependencies } from '../@symbols';


export function getDependencies(klass: Dependent.IConstructor): ImpliedInterfaceKey[] {
  const getDeps = klass[__dependencies] || (() => []);

  return getDeps();
}
