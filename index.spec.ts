import { expect } from 'chai';
import { Keysmith, KEYSMITH, Remap, ReSet } from './index';

describe('Remap', () => {
  it('should work with primitives', () => {
    const map = new Remap([['foo', 42], ['bar', 69]]);
    expect(map.size).to.equal(2);
    expect(map.get('foo')).to.equal(42);
    expect(map.get('bar')).to.equal(69);
  });
  
  it('should work with objects', () => {
    const map = new Remap<object, string>();
    map.set({}, 'foo');
    map.set({foo: 'foo'}, 'foo');
    map.set({bar: 'bar'}, 'bar');
    expect(map.size).to.equal(3);
    expect(map.get({})).to.equal('foo');
    expect(map.get({foo: 'foo'})).to.equal('foo');
    expect(map.get({bar: 'bar'})).to.equal('bar');
    
    map.set({foo: 'bar'}, 'bar');
    expect(map.size).to.equal(4);
    expect(map.get({foo: 'bar'})).to.equal('bar');
  });
  
  it('should work with keysmiths', () => {
    class Foo implements Keysmith {
      constructor(private foo: string) {}
      [KEYSMITH] = () => `foo${this.foo}`;
    }
    
    const map = new Remap<Foo, string>();
    map.set(new Foo('foo'), 'foo');
    map.set(new Foo('bar'), 'bar');
    expect(map.size).to.equal(2);
    expect(map.get(new Foo('foo'))).to.equal('foo');
    expect(map.get(new Foo('bar'))).to.equal('bar');
    
    map.set(new Foo('foo'), 'bar');
    expect(map.size).to.equal(2);
    expect(map.get(new Foo('foo'))).to.equal('bar');
  });
  
  it('should list unmapped entries/keys/values', () => {
    const map = new Remap<string, string>([['foo1', 'foo2'], ['bar1', 'bar2']]);
    expect([...map.keys()]).to.deep.equal(['foo1', 'bar1']);
    expect([...map.values()]).to.deep.equal(['foo2', 'bar2']);
    expect([...map.entries()]).to.deep.equal([['foo1', 'foo2'], ['bar1', 'bar2']]);
  });
});

describe('ReSet', () => {
  it('should work with primitives', () => {
    const set = new ReSet([1, 2, 3]);
    expect(set.size).to.equal(3);
    
    set.add(4);
    expect(set.size).to.equal(4);
    
    set.add(2);
    expect(set.size).to.equal(4);
  });
  
  it('should work with objects', () => {
    const set = new ReSet<object>();
    set.add({foo: 'foo'});
    set.add({bar: 'bar'});
    expect(set.size).to.equal(2);
    expect([...set.entries()]).to.deep.equal([{foo: 'foo'}, {bar: 'bar'}]);
    
    set.add({foo: 'bar'});
    expect(set.size).to.equal(3);
    expect([...set.entries()]).to.deep.equal([{foo: 'foo'}, {bar: 'bar'}, {foo: 'bar'}]);
  });
  
  it('should work with keysmiths', () => {
    class Foo implements Keysmith {
      constructor(private foo: string) {}
      [KEYSMITH] = () => `foo${this.foo}`;
    }
    
    const set = new ReSet<Foo>();
    set.add(new Foo('foo'));
    set.add(new Foo('bar'));
    expect(set.size).to.equal(2);
    
    set.add(new Foo('bar'));
    expect(set.size).to.equal(2);
  });
  
  it('should list entries/keys/values', () => {
    const set = new ReSet([1, 2, 3]);
    expect([...set.entries()]).to.deep.equal([1, 2, 3]);
    expect([...set.keys()]).to.deep.equal([1, 2, 3]);
    expect([...set.values()]).to.deep.equal([1, 2, 3]);
  });
});
