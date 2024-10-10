import { charEval } from './charEval';
import { errorLib } from './errorLibrary';

// TODO:
// 8. Micrositio de prueba
// 4. parseo de archivo a binario
// 5. extracción y construcción del mapa
// 6. extracción de la cadena
// 7. Montaje de la biblioteca
// 9. Readme
// 10. npm

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
