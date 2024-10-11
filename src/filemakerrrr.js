import { stringChecker } from './charcounter.js';
import { errorLib } from './errorLibrary.js';
import { compressionForecast } from './compressionEval.js';
import { Heap } from './minHeap.js';
import { treeMaker } from './treeMaker.js';
import { compressionTable } from './compressionTable.js';
import { compressor } from './compressor.js';
import { assembler } from './assembler.js';
import { binaryBufferForBrowser } from './makeBinaryBuffer.js';
import { fileDownload } from './fileDownload.js';
import { toBin } from './toBinary.js';

export class Filemakerrrr {
    #alwaysZip = false;
    #verbose = false;
    #stringToWork = '';
    #zippedString = null;
    #bytesSecuence = null;

    stringToZip(string) {
        if (!string) {
            errorLib.parameterIsMissing();
        }
        if (typeof string !== 'string') {
            errorLib.dataExpected('string', string);
        }

        this.#stringToWork = string;
        return this;
    }

    forceZip(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.#verbose = verbose;
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
            this.#stringToWork,
        );

        const { should, rate } = compressionForecast(
            this.#stringToWork.length,
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
        const zippedString = await compressor(
            this.#stringToWork,
            zippedCharMap,
        );
        const binarySecuence = assembler(zippedCharMap, zippedString);
        const bytesArray = await binaryBufferForBrowser(binarySecuence);

        // console.log(ready to download)
        this.#bytesSecuence = bytesArray;

        return this;
        // console.log(zipMap);
        // console.log('Secuencia binaria:', binarySecuence);
        // console.log('bytes secuence:', bytesArray);
    }

    download(name) {
        fileDownload(name, this.#bytesSecuence);
    }

    parseFile(uploadedFile) {
        const file = uploadedFile;
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            let binaryString = '';

            for (let i = 0; i < uint8Array.length; i++) {
                binaryString += `${String(toBin(uint8Array[i], 8))} `;
            }

            console.log(binaryString, uint8Array);
        };

        reader.readAsArrayBuffer(file);
    }
}
