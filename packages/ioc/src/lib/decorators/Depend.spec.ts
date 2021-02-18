import { __dependencies } from '../@symbols';
import { Depend } from './Depend';

describe('Depend', () => {
  it('should function as a decorator', () => {
    const Foo = stubClass();

    const DependentFoo = Depend('bar')(Foo);

    expect(Foo).not.toHaveProperty([__dependencies]);
    expect(DependentFoo)
      .toHaveProperty([__dependencies]);
  });
});

function stubClass() {
  return class { };
}
