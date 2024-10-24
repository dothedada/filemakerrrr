import { charEval } from './charEval.js';
import { runtimeErr } from '../utils/errors.js';
import type { ZipMap } from '../core/types.js';

const stringChecker = async (
    text: string,
): Promise<{ charsMap: ZipMap; charsUnicode: number }> =>
    new Promise((resolve, reject) => {
        const charsMap: Map<string, number> = new Map();
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
            reject(new Error(runtimeErr.charsMap));
        }

        resolve({ charsMap, charsUnicode });
    });
export { stringChecker };
