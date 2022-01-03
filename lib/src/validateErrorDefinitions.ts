import flatten from './utils/flatten';
import ErrorDefinition from './ErrorDefinition';

const bail = (definition) => definition instanceof ErrorDefinition;


const validateErrorDefinitions = (errorDefinitions, errorCodeMap = {}) => {
  const flatErrorDefinitions = flatten(errorDefinitions, {bail, separator: ':'});
 //TODO: remove comments:  console.log('errorDefintions', flatErrorDefinitions);
  Object.entries(flatErrorDefinitions).forEach(([id, definition]) => {
   definition.tag(id);

    if (errorCodeMap[definition.errorId]) {
      throw new Error(
        `Duplicate hash for ids ${JSON.stringify(
          errorCodeMap[definition.errorId].id
        )} and ${JSON.stringify(id)}`
      );
    }

    errorCodeMap[definition.errorId] = definition;
  });

  return errorCodeMap;
};


export default validateErrorDefinitions;
