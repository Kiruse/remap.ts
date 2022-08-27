declare module 'object-hash' {
  interface ObjectHashOptions {
    /** Hashing algorithm to use. Supports algorithms returned by `crypto.getHashes()`, as well as `'passthrough'`. Default: `'sha1'`. */
    algorithm?: string;
    /** Whether to exclude values from hashing, effectively only hashing keys. Default: `false`. */
    excludeValues?: boolean;
    /** Encoding to use. When `'buffer'`, returns a `Buffer` instance rather than a `string`. Default: `'hex'`. */
    encoding?: 'buffer' | 'hex' | 'binary' | 'base64';
    /** Ignore unknown object types. Default: `false`. */
    ignoreUnknown?: boolean;
    /** Optional function that replaces values before hashing. Default: identity. */
    replacer?: (value: unknown) => any;
    /** Whether properties on functions are considered when hashing. Default: `true`. */
    respectFunctionProperties?: boolean;
    /** Whether special type attributes (`.prototype`, `.__proto__`, `.constructor`) are hashed. Default: `true`. */
    respectType?: boolean;
    /** Sort all arrays before hashing. Note that this affects *all* collections, i.e. including typed arrays, Sets, Maps, etc. Default: `false`. */
    unorderedArrays?: boolean;
    /** Sort `Set` and `Map` instances before hashing, i.e. make `(hash(new Set([1, 2])) == hash(new Set([2, 1]))) === true`. Default: `true`. */
    unorderedSets?: boolean;
    /** Sort objects before hashing, i.e. make `hash({ x: 1, y: 2 }) === hash({ y: 2, x: 1 })`. Default: `true`. */
    unorderedObjects?: boolean;
    /** Optional function for excluding specific key(s) from hashing. If true is returned, exclude from hash. Default: include all keys. */
    excludeKeys?: PropertyKey;
  }
  
  function hash(obj: unknown): string;
  function hash(obj: unknown, options: ObjectHashOptions & {encoding: 'buffer'}): Buffer;
  function hash(obj: unknown, options: ObjectHashOptions): string;
  
  namespace hash {
    function sha1(value: unknown): string;
    export { ObjectHashOptions };
  }
  
  export = hash;
}
