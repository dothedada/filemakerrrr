import { stringChecker } from './charcounter.js';
import { errorLib } from './errorLibrary.js';
import { zipForecast } from './compressionEval.js';
import { gardener } from './gardener.js';
import { compressionTable } from './compressionTable.js';
import { compressor } from './compressor.js';
import { assembler } from './assembler.js';
import { binaryBufferForBrowser } from './makeBinaryBuffer.js';
import { fileDownload } from './fileDownload.js';
import { toBin } from './toBinary.js';
import { signature } from './units.js';
import { mapBuilder } from './mapBuilder.js';
import { parseHeader } from './parseHeader.js';
import { decompressor } from './decompressor.js';

// create object
//      always zip
//      fixed zip
//      add string
//      zip
//      unzip
//      download
//      upload
//      verbose

export class Filemakerrrr {
    #alwaysZip = false;
    #verbose = false;
    #stringIn = null;
    #stringOut = null;
    #bytesSecuence = null;

    constructor({ verbose = false, alwaysZip = false } = {}) {
        if (typeof verbose !== 'boolean') {
            errorLib.dataExpected('Boolean', alwaysZip);
        }
        if (typeof alwaysZip !== 'boolean') {
            errorLib.dataExpected('Boolean', alwaysZip);
        }

        this.#alwaysZip = alwaysZip;
        this.#verbose = verbose;
    }

    forceIt(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.#verbose = verbose;
    }

    useThis(string) {
        if (!string) {
            errorLib.parameterIsMissing();
        }
        if (typeof string !== 'string') {
            errorLib.dataExpected('string', string);
        }

        this.#stringIn = string;
        return this;
    }

    async zip() {
        if (!this.#stringIn) {
            throw new Error('Provide a string to zip before you zip it, duh!');
        }

        // console.log('Parsing the string')
        const { charsMap, charsUnicode } = await stringChecker(this.#stringIn);

        const { should, rate } = zipForecast(
            this.#stringIn.length,
            charsMap.size,
            charsUnicode,
        );
        console.log(should, rate);
        // console.log('There is no need to zip the string, the file will be uncopressed')
        // console.log('The zip process started')

        // console.log('Making the compression map...')
        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        // console.log('Zipping the string...')
        const zippedString = await compressor(this.#stringIn, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#stringOut = await binaryBufferForBrowser(binarySecuence);

        // console.log('Ready to download...')
        return this;
    }

    download(name = 'myZippedString') {
        fileDownload(name, this.#stringOut);
    }

    parseFile(uploadedFile) {
        const file = uploadedFile;
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            let binaryString = '';

            const fileSignature = uint8Array.slice(0, 3);
            if (
                !fileSignature.every(
                    (byte, index) =>
                        String.fromCharCode(byte) === signature[index],
                )
            ) {
                console.log(fileSignature);
                errorLib.wrongFileFormat();
            }

            for (let i = 3; i < uint8Array.length - 1; i++) {
                binaryString += toBin(uint8Array[i], 8);
            }

            if (uint8Array[uint8Array.length - 1] > 0) {
                const trim = 8 - uint8Array[uint8Array.length - 1];
                binaryString = binaryString.slice(0, -trim);
            }

            // parseHeader(binaryString);
            const { charsMap, currentPosition } = mapBuilder(
                parseHeader(binaryString),
                binaryString,
            );

            const unzippedString = decompressor(
                charsMap,
                binaryString,
                currentPosition,
            );

            console.log(unzippedString);
        };

        reader.readAsArrayBuffer(file);
    }

    unzipIt() {
        //
        //
        // get the last byte, parse it
        // trim the number of chars in the byte
        //
        //
        //
        //
    }
}
