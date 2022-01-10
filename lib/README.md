# server-error-lib

A library for defining and structuring errors

## Problem statement

In a server application, errors often occur. In most cases, these errors are anticipated, caught and thrown.

For example:

```js
try {
    ....some code
}catch(error) {
    throw new Error('Invalid input', error)
}
```

Now a couple of issues crop up when errors are defined like above in an application:

1. There is no way to know all the possible errors that your application might throw without manually sniffing through the code.

2. The message of the error is user-generated which can be mis-worded

3. The message of the error can also conflict with other messages

4. The message of the error often lack context

## Solution
This library solves the above problems  by enforcing a pattern for error defintion and ensuring the errors are unique through out the application and referenced applications.
It also expose a function that allows your errors to be  easily exported and referenced.


## How to use

1. Define your error defintion file.

# errorDefinitions.js
```js
import {
  validateErrorDefinitions,
  ErrorDefinition,
} from 'server-error-libary';

//errorDefintions is a object where the keys reference a section of your application and the messages are a type of ErrorDefinition
const errorDefinitions = {
  LOGIN: {
      AUTH_FAILED: new ErrorDefinition(404, 'User not found or revive failed.'),
      OTHER_FAILED: new ErrorDefinition(15, 'Grpc error.'),
  },
  LOGOUT: ErrorDefinition(400, 'Bad request: Invalid user'),
};
//call the validate function to ensure defintions are unique across the application(s)
validateErrorDefinitions(errorDefinitions);

export default errorDefintions;
```

2. Use the errorDefinitions in your application

```js
import {ServerError} from 'server-error-library';
import errorDefinitions from './errorDefinitions';

try {

}catch (error) {    
    // throw custom error that will be handled within the errorHandlerMiddleware
    throw new ServerError(errorDefinitions.LOGIN.AUTH_FAILED, error);
}

```

3.  Export all the error defintions in your appplication by running the bin command, generateErrorCodes
```
$ generateErrorCodes
```

## Quick Start

TL;DR? Check out the [quick start example][quick-example] in `./examples/`.
There are a number of other examples in [`./examples/*.js`][examples].
Don't see an example you think should be there? Submit a pull request
to add it!

