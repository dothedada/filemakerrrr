import { charEval } from './charEval.js';
import { errorLib } from './errorLibrary.js';

// TODO:
// 1. montar los metodos opcionales (force zip, and shit)
// 1.a. ajustar los textos del listener
// 2. refactorizacion y ordenada del codigo
// 3. Montaje de la biblioteca
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
