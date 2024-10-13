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
    #zipIn = null;
    #zipOut = null;
    #unzipIn = null;
    #unzipOut = null;

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

        this.#zipIn = string;
        return this;
    }

    async zip() {
        if (!this.#zipIn) {
            throw new Error('Provide a string to zip before you zip it, duh!');
        }

        // console.log('Parsing the string')
        const { charsMap, charsUnicode } = await stringChecker(this.#zipIn);

        const { should, rate } = zipForecast(
            this.#zipIn.length,
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
        const zippedString = await compressor(this.#zipIn, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipOut = await binaryBufferForBrowser(binarySecuence);

        // console.log('Ready to download...')
        return this;
    }

    downloadZip(name = 'myZippedString') {
        fileDownload(name, this.#zipOut, true);
    }

    downloadUnzip(name = 'myUnzippedString') {
        fileDownload(name, this.#unzipOut, false);
    }

    async parseFile(file) {
        this.#unzipIn = await this.#fileLoader(file).then((arrayBuffer) =>
            this.#fileCheck(arrayBuffer),
        );

        console.log(this.#unzipIn);
        // const file = uploadedFile;
        // const reader = new FileReader();
        //
        // reader.onload = (e) => {
        //     const arrayBuffer = e.target.result;
        //     const uint8Array = new Uint8Array(arrayBuffer);
        //     this.#unzipIn = '';
        //
        //     for (let i = 3; i < uint8Array.length - 1; i++) {
        //         this.#unzipIn += toBin(uint8Array[i], 8);
        //     }
        //
        //     if (uint8Array[uint8Array.length - 1] > 0) {
        //         const trim = 8 - uint8Array[uint8Array.length - 1];
        //         this.#unzipIn = this.#unzipIn.slice(0, -trim);
        //     }
        //     console.log(arrayBuffer, uint8Array);
        //
        //     return this;
        // };
        //
        // reader.readAsArrayBuffer(file);
    }

    #fileLoader(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) =>
                reject(new Error('Error while uploading the file'));
            reader.readAsArrayBuffer(file);
        });
    }

    #fileCheck(arrayBuffer) {
        const fileArray = new Uint8Array(arrayBuffer);
        console.log(fileArray);
        const isf4r = fileArray
            .slice(0, 3)
            .every((byte, i) => String.fromCharCode(byte) === signature[i]);
        if (!isf4r) {
            errorLib.wrongFileFormat();
        }

        return fileArray.slice(3);
    }

    #parseDataToBin(fileArray) {
        return new Promise((resolve, reject) => {
            let stringBin = '';

            for (let i = 0; i < fileArray.length - 1; i++) {
                stringBin += toBin(fileArray[i], 8);
            }

            if (fileArray[fileArray.length - 1] > 0) {
                const trim = 8 - fileArray[fileArray.length - 1];
                stringBin = stringBin.slice(0, -trim);
            }

            if (!stringBin.length) {
                reject(new Error('An error ocur while parsing the binary'));
            }

            resolve(stringBin);
        });
    }

    unzip(stringBin) {
        return new Promise((resolve, reject) => {
            const header = parseHeader(stringBin);
            const { charsMap, currentPosition } = mapBuilder(header, stringBin);
            const string = decompressor(charsMap, stringBin, currentPosition);

            if (typeof string === 'string' && string.length) {
                reject(new Error('An error ocur while unzipping the string'));
            }

            resolve(string);
        });
    }
}
