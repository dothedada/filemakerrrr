import { charEval } from './charEval.js';

const stringChecker = async (text) =>
    new Promise((resolve, reject) => {
        if (typeof text !== 'string') {
            reject(errorLib.dataExpected('string', text));
        }

        const charsMap = new Map();
        let charsUnicode = 0;

        for (const char of text) {
            const charStandard = charEval(char).standard;
            if (charStandard === 'outOfBMP') {
                continue;
            }
            if (charStandard === 'unicode') {
                charsUnicode++;
            }
            charsMap.set(char, (charsMap.get(char) || 0) + 1);
        }

        if (!charsMap.size) {
            reject(new Error('Could not create the charsMap'));
        }

        resolve({ charsMap, charsUnicode });
    });
export { stringChecker };
