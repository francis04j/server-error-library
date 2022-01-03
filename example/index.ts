import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import fib from './fib'

const rl = readline.createInterface({ input, output });
rl.question('The number? ', (answer) =>
{
     console.log('Fibonacci calc', fib(parseInt(answer)));
     rl.close();
}
);
