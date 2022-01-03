import {
    validateErrorDefinitions,
    ErrorDefinition,
  } from 'server-error-library';
  
  //errorDefintions is a object where the keys reference a section of your application and the messages are a type of ErrorDefinition
  const errorDefinitions = {
    INPUT: {
        MIN: new ErrorDefinition(400, 'no number less than zero allowed'),
        MAX: new ErrorDefinition(400, 'Maximum input is 99'),
    },
    COMPUTE: new ErrorDefinition(500, 'Server error'),
  };
  //call the validate function to ensure defintions are unique across the application(s)
  validateErrorDefinitions(errorDefinitions);
  
  export default errorDefinitions;