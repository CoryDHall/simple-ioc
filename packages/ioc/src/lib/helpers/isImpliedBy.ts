import { Implied, ImpliedInterfaceKey } from '../@types';
import { __implications } from '../@symbols';


type TestInterface = (klass: Implied.InterfaceConstructor) => boolean;

export function isImpliedBy(key: ImpliedInterfaceKey): TestInterface {
  const matchKey = (i: ImpliedInterfaceKey): boolean => i === key;

  return (klass: Implied.InterfaceConstructor) => {
    const klassImplications = klass[__implications]();

    return klassImplications.some(matchKey);
  };
}
