import { stringChecker } from './charcounter.js';
import { errorLib } from './errorLibrary.js';
import { zipForecast } from './compressionEval.js';
import { gardener } from './gardener.js';
import { compressionTable } from './compressionTable.js';
import { compressor } from './compressor.js';
import { assembler } from './assembler.js';
import { binaryBufferForBrowser } from './makeBinaryBuffer.js';
import { fileLoader } from './fileLoader.js';
import { fileCheck } from './fileCheck.js';
import { fileDownload } from './fileDownload.js';
import { parseBufferToBin } from './parseBufferToBin.js';
import { parseBinToChar } from './parseBinToChar.js';

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
    #listener = console.log;

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;

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

        this.#zipInput = string;
        return this;
    }

    async zip() {
        if (!this.#zipInput) {
            throw new Error('Provide a string to zip before you zip it, duh!');
        }

        // console.log('Parsing the string')
        const { charsMap, charsUnicode } = await stringChecker(this.#zipInput);

        const { should, rate } = zipForecast(
            this.#zipInput.length,
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
        const zippedString = await compressor(this.#zipInput, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipOutput = await binaryBufferForBrowser(binarySecuence);

        // console.log('Ready to download...')
        return this;
    }

    downloadZip(name = 'myZippedString') {
        fileDownload(name, this.#zipOutput, true);
    }

    downloadUnzip(name = 'myUnzippedString') {
        fileDownload(name, this.#unzipOutput, false);
    }

    async parseFile(file) {
        const fileData = await fileLoader(file);
        this.#unzipFileBuffer = fileCheck(fileData);
        console.log(this.#unzipFileBuffer);
    }

    async unzip() {
        const binaryString = await parseBufferToBin(this.#unzipFileBuffer);
        const unzippedString = await parseBinToChar(binaryString);

        console.log(binaryString, unzippedString);
    }
}
