"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Remap_data, _ReSet_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyof = exports.isKeysmith = exports.ReSet = exports.Remap = exports.KEYSMITH = void 0;
const object_hash_1 = __importDefault(require("object-hash"));
exports.KEYSMITH = Symbol('Keysmith');
class Remap {
    constructor(init) {
        _Remap_data.set(this, {});
        this.set = (key, value) => {
            __classPrivateFieldGet(this, _Remap_data, "f")[(0, exports.keyof)(key)] = [key, value];
            return this;
        };
        this.get = (key) => { var _a; return (_a = __classPrivateFieldGet(this, _Remap_data, "f")[(0, exports.keyof)(key)]) === null || _a === void 0 ? void 0 : _a[1]; };
        this.delete = (key) => {
            const k = (0, exports.keyof)(key);
            const has = k in __classPrivateFieldGet(this, _Remap_data, "f");
            delete __classPrivateFieldGet(this, _Remap_data, "f")[k];
            return has;
        };
        this.clear = () => { __classPrivateFieldSet(this, _Remap_data, {}, "f"); };
        this.entries = () => Object.values(__classPrivateFieldGet(this, _Remap_data, "f"));
        this.keys = () => this.entries().map(([k]) => k);
        this.values = () => this.entries().map(([, v]) => v);
        this.forEach = (callback) => {
            for (const [key, value] of this.entries()) {
                callback(value, key, this);
            }
        };
        /** Non-standard method to call `set` for every item of `it`. */
        this.extend = (it) => {
            for (const [k, v] of it) {
                this.set(k, v);
            }
            return this;
        };
        init && this.extend(init);
    }
    get size() { return Object.keys(__classPrivateFieldGet(this, _Remap_data, "f")).length; }
}
exports.Remap = Remap;
_Remap_data = new WeakMap();
;
class ReSet {
    constructor(init) {
        _ReSet_data.set(this, {});
        this.add = (value) => {
            __classPrivateFieldGet(this, _ReSet_data, "f")[(0, exports.keyof)(value)] = value;
            return this;
        };
        this.delete = (value) => {
            const key = (0, exports.keyof)(value);
            const has = key in __classPrivateFieldGet(this, _ReSet_data, "f");
            delete __classPrivateFieldGet(this, _ReSet_data, "f")[key];
            return has;
        };
        this.clear = () => { __classPrivateFieldSet(this, _ReSet_data, {}, "f"); };
        this.entries = () => Object.values(__classPrivateFieldGet(this, _ReSet_data, "f"));
        this.keys = this.entries;
        this.values = this.entries;
        this.forEach = (callback) => {
            for (const item of this.entries()) {
                callback(item, item, this);
            }
        };
        /** Non-standard method to call `add` for each element of `it`. */
        this.extend = (it) => {
            for (const item of it) {
                this.add(item);
            }
            return this;
        };
        init && this.extend(init);
    }
    get size() { return Object.keys(__classPrivateFieldGet(this, _ReSet_data, "f")).length; }
}
exports.ReSet = ReSet;
_ReSet_data = new WeakMap();
;
const isKeysmith = (v) => typeof v === 'object' && exports.KEYSMITH in v;
exports.isKeysmith = isKeysmith;
const keyof = (v) => (0, exports.isKeysmith)(v) ? v[exports.KEYSMITH]() : (0, object_hash_1.default)(v);
exports.keyof = keyof;
