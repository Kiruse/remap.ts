export declare const KEYSMITH: unique symbol;
export declare class Remap<K, V> {
    #private;
    constructor(init?: Iterable<[K, V]>);
    set: (key: K, value: V) => this;
    get: (key: K) => V;
    delete: (key: K) => boolean;
    clear: () => void;
    entries: () => [K, V][];
    keys: () => K[];
    values: () => V[];
    forEach: (callback: (value: V, key: K, map: Remap<K, V>) => void) => void;
    /** Non-standard method to call `set` for every item of `it`. */
    extend: (it: Iterable<[K, V]>) => this;
    get size(): number;
}
export declare class ReSet<T> {
    #private;
    constructor(init?: Iterable<T>);
    add: (value: T) => this;
    delete: (value: T) => boolean;
    clear: () => void;
    entries: () => T[];
    keys: () => T[];
    values: () => T[];
    forEach: (callback: (value: T, key: T, set: ReSet<T>) => void) => void;
    /** Non-standard method to call `add` for each element of `it`. */
    extend: (it: Iterable<T>) => this;
    get size(): number;
}
export interface Keysmith {
    [KEYSMITH](): string;
}
export declare const isKeysmith: (v: any) => v is Keysmith;
export declare const keyof: (v: any) => string;
