import { IOCContainer } from './Container';
import { Depend, Imply } from './decorators';

const testRegisterTypeReturn = () => {
  const container = new IOCContainer();

  expect(container.registerType('Foo'))
    .toBeInstanceOf(Function);
};

const testConstructor = () => {
  expect(new IOCContainer())
    .toBeInstanceOf(IOCContainer);
};

const testResolveUndecoratedConstructor = () => {
  const container = new IOCContainer();

  class Foo { }

  expect(() => container.resolve(Foo)).not.toThrow();
};

const testResolveReturnValue = () => {
  const container = new IOCContainer();

  class Foo { }

  expect(container.resolve(Foo)())
    .toBeInstanceOf(Foo);

  const Bar = jest.fn();

  container.resolve(Bar)();
  expect(Bar)
    .toHaveBeenCalled();
};

const testResolveUndeclaredDependencies = () => {

  const container = new IOCContainer();

  const Foo = Depend('Bar')(class Foo { });

  expect(() => container.resolve(Foo))
    .toThrow();
};

const testDepGraphEncapsulation = () => {
  const containerA = new IOCContainer();
  const containerB = new IOCContainer();

  const Foo = jest.fn();
  const Bar = Imply('Bar')(jest.fn());
  const Baz = Imply('Baz')(jest.fn());

  containerA.registerType('Bar')(Bar);
  containerA.registerType('Baz')(Baz, () => 'foobar');
  containerB.registerType('Baz')(Baz);
  containerA.resolve(Depend('Bar', 'Baz')(Foo))();
  expect(Baz)
    .toHaveBeenLastCalledWith('foobar');
  containerB.resolve(Depend('Baz')(Foo))();
  expect(Baz).not.toHaveBeenLastCalledWith('foobar');
  expect(Bar)
    .toHaveBeenCalledTimes(1);
  expect(Baz)
    .toHaveBeenCalledTimes(2);
};

const testRegisterTypeCallback = () => {
  const containerA = new IOCContainer();

  const Foo = Depend('Baz', 'Bar')(jest.fn());
  const Bar = Imply('Bar')(jest.fn());
  const Baz = Imply('Baz')(jest.fn());
  const testCallback = jest.fn();

  containerA.registerType('Bar')(Bar, testCallback);
  containerA.registerType('Baz')(Baz, () => 'foobar');
  containerA.resolve(Foo)();
  expect(testCallback)
    .toHaveBeenCalled();
  expect(Baz)
    .toHaveBeenCalledWith('foobar');
};

describe('IOCContainer', () => {

  it('should be constructable', testConstructor);
  describe('#registerType', () => {
    it('should return a curried function for defining constructors', testRegisterTypeReturn);

    describe('return value', () => {
      it.todo('subsequent calls with identical keys overwrite the same dependency node');
      it.todo('should throw if the constructor is not decorated');
      it('should accept an optional callback for defining instance arguments',
        testRegisterTypeCallback);
    });
  });

  describe('#resolve', () => {
    it('should allow undecorated constructors', testResolveUndecoratedConstructor);
    it('should throw an error if called with undeclared dependencies',
      testResolveUndeclaredDependencies);
    it('should return a factory method for the target constructor', testResolveReturnValue);
  });

  describe('each instance', () => {
    it('should encapsulate it\'s dependency graph', testDepGraphEncapsulation);
    it.todo('should create unique target instances');
    it.todo('should resolve nested dependencies');

  });
});
