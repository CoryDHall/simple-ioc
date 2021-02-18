import { __implications } from '../@symbols';
import { Imply } from './Imply';

describe('Imply', () => {
  it('should function as a decorator', () => {
    const Foo = stubClass();

    const ImpliedFoo = Imply('foo')(Foo);

    expect(Foo).not.toHaveProperty([__implications]);
    expect(ImpliedFoo)
      .toHaveProperty([__implications]);
  });
});

function stubClass() {
  return class { };
}
