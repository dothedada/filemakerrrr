import { message } from '../utils/messages.js';
import { charEval } from './charEval.js';

const stringChecker = async (text) =>
    new Promise((resolve, reject) => {
        const charsMap = new Map();
        let charsUnicode = 0;

        for (const char of text) {
            const charStandard = charEval(char).standard;
            if (charStandard === 'outOfBMP') {
                continue;
            }
            charsMap.set(char, (charsMap.get(char) || 0) + 1);
            if (charStandard === 'unicode' && charsMap.get(char) === 1) {
                charsUnicode++;
            }
        }

        if (!charsMap.size) {
            reject(new Error(message.runtimeErr.charsMap));
        }

        resolve({ charsMap, charsUnicode });
    });
export { stringChecker };
