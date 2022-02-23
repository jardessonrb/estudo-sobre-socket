import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
const rl = readline.createInterface({ input, output });

const close = () => {
    rl.close();
}

const int = (value) => {
    return parseInt(value);
}

const float = (value) => {

    return parseFloat(value);
}

const str = (value) => {
    return String(value);
}

const stdIn = async (value = "") => {
    return await rl.question(value);
}


export { int, float, str, stdIn, close};