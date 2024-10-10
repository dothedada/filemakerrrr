import { stringChecker } from './charcounter';
import { errorLib } from './errorLibrary';
import { compressionForecast } from './compressionEval';
import { Heap } from './minHeap';
import { treeMaker } from './treeMaker';
import { compressionTable } from './compressionTable';
import { compressor } from './compressor';
import { assembler } from './assembler';
import { binaryBufferForBrowser } from './makeBinaryBuffer';

export class Filemakerrrr {
    constructor(string = '', settingObject = {}) {
        const { alwaysZip, verbose } = settingObject;
        this.alwaysZip = alwaysZip ?? false;
        this.verbose = verbose ?? false;
        this.stringToWork = string;
        this.zippedString = null;
    }

    stringToZip(string) {
        if (!string) {
            errorLib.parameterIsMissing();
        }
        if (typeof string !== 'string') {
            errorLib.dataExpected('string', string);
        }

        this.stringToWork = string;
        return this;
    }

    forceZip(alwaysZip = true) {
        this.alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.verbose = verbose;
    }

    #gardener(charsMap) {
        return new Promise((resolve) => {
            const charsHeap = new Heap();
            for (const keyValue of charsMap) {
                charsHeap.push(keyValue);
            }
            treeMaker(charsHeap);

            resolve(charsHeap);
        });
    }

    async zipIt() {
        // console.log('Parsing the string')
        const { charsMap, charsUnicode } = await stringChecker(
            this.stringToWork,
        );

        const { should, rate } = compressionForecast(
            this.stringToWork.length,
            charsMap.size,
            charsUnicode,
        );
        // console.log(should, rate);
        // console.log('There is no need to zip the string, the file will be uncopressed')
        // console.log('The zip process started')

        // console.log('Making the compression map...')
        const charsHeap = await this.#gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        // console.log('Zipping the string...')
        const zippedString = await compressor(this.stringToWork, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        const bytesArray = await binaryBufferForBrowser(binarySecuence);

        // console.log(ready to download)
        return bytesArray;
        // console.log(zipMap);
        // console.log('Secuencia binaria:', binarySecuence);
        // console.log('bytes secuence:', bytesArray);
    }
}
