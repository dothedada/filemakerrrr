import { charEval } from './charEval.js';
import { errorLib } from './errorLibrary.js';

// TODO:
// 1. solucionar el problema de la codificacion de caracteres
// 2. Montaje de la biblioteca
// 3. refactorizacion y ordenada del codigo
// 4. Readme
// 5. npm

const stringChecker = async (text) =>
    new Promise((resolve, reject) => {
        if (typeof text !== 'string') {
            reject(errorLib.dataExpected('string', text));
        }

        const charsMap = new Map();
        let charsUnicode = 0;

        for (const char of text) {
            charsMap.set(char, (charsMap.get(char) || 0) + 1);
            if (charEval(char).standard === 'unicode') {
                charsUnicode++;
            }
        }

        resolve({ charsMap, charsUnicode });
    });
export { stringChecker };
