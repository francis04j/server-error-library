import flattenErrorDefinition from './flattenErrorDefinitions';
import ErrorDefinition from './ErrorDefinition';

const bail = (definition) => definition instanceof ErrorDefinition;


const validateErrorDefinitions = (errorDefinitions, errorCodeMap = {}) => {
  
  console.log('ERRORD-DEFIN', errorDefinitions.hasOwnProperty('default'))
 // console.trace()
 // if(!errorDefinitions.hasOwnProperty('default')) {
        const flatErrorDefinitions = flattenErrorDefinition(errorDefinitions, bail, ':');
        console.log('flatErrorDefinitions', flatErrorDefinitions);
        for(const [id, definition] of Object.entries(flatErrorDefinitions)) {
         
          definition.tag(id);
          if (errorCodeMap[definition.errorId]) {
            throw new Error(
              `Duplicate hash for ids ${JSON.stringify(
                errorCodeMap[definition.errorId].id
              )} and ${JSON.stringify(id)}`
            );
          }

          errorCodeMap[definition.errorId] = definition;
        }
       
       
        // Object.entries(flatErrorDefinitions).forEach(([idss, definition]) => {
        //   console.log('IDDD', idss)
        // definition.tag(idss);

          
        // });

        return errorCodeMap;
 // }
};


export default validateErrorDefinitions;
