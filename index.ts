import hash from 'object-hash';

export const KEYSMITH = Symbol('Keysmith');

export class Remap<K, V> {
  #data: Record<string, [K, V]> = {};
  
  constructor(init?: Iterable<[K, V]>) {
    init && this.extend(init);
  }
  
  set = (key: K, value: V) => {
    this.#data[keyof(key)] = [key, value];
    return this;
  };
  
  get = (key: K) => this.#data[keyof(key)]?.[1];
  
  delete = (key: K) => {
    const k = keyof(key);
    const has = k in this.#data;
    delete this.#data[k];
    return has;
  };
  
  clear = () => {this.#data = {}};
  
  entries = () => Object.values(this.#data);
  keys = () => this.entries().map(([k]) => k);
  values = () => this.entries().map(([,v]) => v);
  forEach = (callback: (value: V, key: K, map: Remap<K, V>) => void) => {
    for (const [key, value] of this.entries()) {
      callback(value, key, this);
    }
  };
  
  /** Non-standard method to call `set` for every item of `it`. */
  extend = (it: Iterable<[K, V]>) => {
    for (const [k, v] of it) {
      this.set(k, v);
    }
    return this;
  };
  
  get size() { return Object.keys(this.#data).length }
};

export class ReSet<T> {
  #data: Record<string, T> = {};
  
  constructor(init?: Iterable<T>) {
    init && this.extend(init);
  }
  
  add = (value: T) => {
    this.#data[keyof(value)] = value;
    return this;
  };
  
  delete = (value: T) => {
    const key = keyof(value);
    const has = key in this.#data;
    delete this.#data[key];
    return has;
  };
  
  clear = () => {this.#data = {}}
  
  entries = () => Object.values(this.#data);
  keys = this.entries;
  values = this.entries;
  
  forEach = (callback: (value: T, key: T, set: ReSet<T>) => void) => {
    for (const item of this.entries()) {
      callback(item, item, this);
    }
  };
  
  /** Non-standard method to call `add` for each element of `it`. */
  extend = (it: Iterable<T>) => {
    for (const item of it) {
      this.add(item);
    }
    return this;
  };
  
  get size() { return Object.keys(this.#data).length }
};

export interface Keysmith {
  [KEYSMITH](): string;
}

export const isKeysmith = (v: any): v is Keysmith => typeof v === 'object' && KEYSMITH in v;
export const keyof = (v: any) => isKeysmith(v) ? v[KEYSMITH]() : hash(v);
