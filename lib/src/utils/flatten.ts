type Bail<T> = (value: T) => boolean;

const flatten = <T>(source, options: {bail?: Bail<T>; separator?: string} = {}): {[key: string]: T} => {
  const flattened = {};

  const {bail = () => false, separator = ':'} = options;

  const inner = (current: any, keySoFar = []) => {   
    if (typeof current === 'object' && !bail(current)) {
      for (const [key, value] of Object.entries(current)) {
        inner(value, [...keySoFar, key]);
      }
    } else {
      flattened[keySoFar.join(separator)] = current;
    }
  };

  inner(source);

  return flattened;
};

export default flatten;

