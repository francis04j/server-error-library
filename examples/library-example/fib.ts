import {ServerError} from 'server-error-library';
import errorDefinitions from './errorDefinition';

const fib = (input: number): number => {
    if(input < 0) {
        throw new ServerError(errorDefinitions.INPUT.MIN);
    }
    if(input > 99) {
        throw new ServerError(errorDefinitions.INPUT.MAX);
    }
    try { 
        if(input === 1 || input === 0 ) {
            return input;
        }
        if(input === 2) return 1;

        return fib(input - 1) + fib(input - 2);
    }catch(error) {
        throw new ServerError(errorDefinitions.COMPUTE)
    }
};

export default fib;