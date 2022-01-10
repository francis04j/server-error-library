import { ErrorDefinition } from ".";

type Bail<T> = (value: T) => boolean;

const flattenErrorDefinition = <T>(errorDefinitions: ErrorDefinition[], bail: Bail<T> = ( )=> false, separator: string = ':'): {[key: string]: ErrorDefinition} => {

    if (!errorDefinitions) {
         throw new Error('Invalid input for flattenErrorDefintion'); // TODO: make an error definition
    }

    const result = {}
    const recurse = (currentObj, keys = []) => {
        if(typeof currentObj === 'object' && bail(currentObj) === false) {
            for (const [key, value] of Object.entries(currentObj)) {
                if (typeof value === 'object' && value !== null) {
                  //  keys.push(key)
                    recurse(value, [...keys, key])
                } else if(keys.length){
                    // keys.push(key)
                    result[[...keys, key].join(':')] = value
                }else{
                    result[key] = value
                }
            } 
        }else{
            result[keys.join(separator)] = currentObj
        }
    };
    
    recurse(errorDefinitions);

    return result;
}

export default flattenErrorDefinition;