import { ErrorDefinition } from ".";

const flattenErrorDefinition = (errorDefinitions: ErrorDefinition[]) => {
    if (!errorDefinitions) return errorDefinitions;
    if (!Object.keys(errorDefinitions).length)
        return errorDefinitions;

    // console.log('WEeee', errorDefinitions)
    let result = {}
    const recurse = (errorDefinitions, keys = []) => {
        Object.entries(errorDefinitions).forEach(elem => {           
    
            if (typeof elem[1] === 'object' && elem[1] !== null) {
                keys.push(elem[0])
                recurse(elem[1], keys)
            } else if(keys.length){
                keys.push(elem[0])
                result[keys.join(':')] = elem[1]
            }else{
                result[elem[0]] = elem[1]
            }
        });
        return result
    };
    return recurse(errorDefinitions);

}

export default flattenErrorDefinition;