import ErrorDefinition from './ErrorDefinition';
import validateErrorDefinitions from './validateErrorDefinitions';

describe('validateErrorDefinitions', () => {
  it('should return error code map', () => {
    const errorDefinitions = {
      LOGIN: {
          AUTH_FAILED: new ErrorDefinition(404, 'User not found or revive failed.'),
          OTHER_FAILED: new ErrorDefinition(15, 'Grpc error.'),
      },
      LOGOUT: new ErrorDefinition(400, 'Bad request: Invalid user'),
    };
   
      const errorCodeMap = validateErrorDefinitions(errorDefinitions);

      expect(errorCodeMap).toBeTruthy();
      expect(Object.keys(errorCodeMap).length).toBe(3);
   
  });

  it('should throw error if Error definitions clashes', () => {
    const collidingErrorDefinitions = {
      LOGIN: {
        AUTH_FAILED: new ErrorDefinition(404, 'User not found or revive failed.'),
        OTHER_FAILED: new ErrorDefinition(404, 'User not found or revive failed.'),
      },
      LOGOUT: new ErrorDefinition(400, 'Bad request: Invalid user'),
    };

    try {
      validateErrorDefinitions(collidingErrorDefinitions)
    }catch(error) {
      expect(error.message).toBe('Duplicate hash for ids "LOGIN:AUTH_FAILED" and "LOGIN:OTHER_FAILED"')
    }
    
    // expect(() =>
    //   validateErrorDefinitions(collidingErrorDefinitions)
    // ).toThrowErrorMatchingSnapshot();

  });
});
