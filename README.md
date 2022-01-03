# server-error-lib

A library for defining and structuring errors

## Problem statement

In a server application, errors often occur. In most cases, these errors are anticipated, caught and thrown
for example:

```js
try {
    ....some code
}catch(error) {
    throw new Error('Invalid input', error)
}
```

Now a couple of issues crop up when errors are defined like above in an application:

1. There is no way to know all the possible errors that your application might throw without manually sniffing through the code. This is an information that is imperative to the consumers of your application especially if your consumner is an UI client.

2. Most errors thrown are often a message or a status code or a combination of both. This is not ideal for your consumers. this library enforces a pattern of defining your errors to always have a unique code and message.

3. Having an error message or status code is not often enough. You need them to be uniquely identifiable so that debugging and reporting are easy. this library enforces uniqueness of errors in your application(s)

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
## Quick Start

TL;DR? Check out the [quick start example][quick-example] in `./examples/`.
There are a number of other examples in [`./examples/*.js`][examples].
Don't see an example you think should be there? Submit a pull request
to add it!

