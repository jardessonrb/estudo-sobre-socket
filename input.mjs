import { int, float, str, stdIn, close} from './stdin.mjs';

{
    const number = int(await stdIn("Digite um inteiro: "));
    console.log(`Numero digitado: ${number}`);
}
{
    const number = float(await stdIn("Digite um float: "));
    console.log(`Numero digitado: ${number}`);
}
{
    const frase = str(await stdIn("Digite um frase: "));
    console.log(`Frase digitada: ${frase}`);
}


close();
