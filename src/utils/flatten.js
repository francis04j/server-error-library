"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten = (source, options = {}) => {
    const flattened = {};
    const { bail = () => false, separator = ':' } = options;
    const inner = (current, keySoFar = []) => {
        if (typeof current === 'object' && !bail(current)) {
            for (const [key, value] of Object.entries(current)) {
                inner(value, [...keySoFar, key]);
            }
        }
        else {
            flattened[keySoFar.join(separator)] = current;
        }
    };
    inner(source);
    return flattened;
};
exports.default = flatten;
