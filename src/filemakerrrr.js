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
import { message } from './messages.js';

export class Filemakerrrr {
    #alwaysZip = false;
    #verbose = false;
    #listener = console.log;
    #lang = 'es';
    #downloadName = 'miFile';

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;

    constructor(
        fileOrString = undefined,
        { verbose = true, alwaysZip = false, downloadName, lang = 'es' } = {},
    ) {
        if (typeof verbose !== 'boolean') {
            errorLib.dataExpected('Boolean', alwaysZip);
        }
        if (typeof alwaysZip !== 'boolean') {
            errorLib.dataExpected('Boolean', alwaysZip);
        }
        this.#alwaysZip = alwaysZip;
        this.#verbose = verbose;
        this.#downloadName = downloadName;

        if (typeof fileOrString === 'string') {
            this.#zipInput = fileOrString;
            this.zip().then(() => this.downloadZip('asdasdada'));
        }
    }

    forceIt(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.#verbose = verbose;
        return this;
    }

    addListener(callback) {
        this.#listener = callback;
        return this;
    }

    #talkToYou([process, key, args], always = false) {
        if (!always && !this.#verbose) {
            return;
        }

        const baseOutput = message[this.#lang][process][key];
        const finalOutput = args ? baseOutput(args) : baseOutput;
        this.#listener(finalOutput);
    }

    stringToZip(string) {
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

        this.#talkToYou(['zip', 'analize']);

        const { charsMap, charsUnicode } = await stringChecker(this.#zipInput);
        const { should, rate } = zipForecast(
            this.#zipInput.length,
            charsMap.size,
            charsUnicode,
        );

        this.#talkToYou(['zip', 'rate', rate]);

        if (!this.#alwaysZip && !should) {
            this.#talkToYou(['zip', 'willNotZip']);
            this.#zipOutput = this.#zipInput;
            return this;
        }

        this.#talkToYou(['zip', 'willZip']);
        this.#talkToYou(['zip', 'zipMap']);

        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        this.#talkToYou(['zip', 'zipString']);

        const zippedString = await compressor(this.#zipInput, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipOutput = await binaryBufferForBrowser(binarySecuence);

        this.#talkToYou(['zip', 'readyToDownload']);

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
        this.#unzipFileBuffer = fileCheck(fileData, this.#listener, this.#lang);

        return this.#unzipFileBuffer;
    }

    async unzip() {
        const binaryString = await parseBufferToBin(this.#unzipFileBuffer);
        const unzippedString = await parseBinToChar(binaryString);

        this.#unzipOutput = unzippedString;
        return unzippedString;
    }
}
