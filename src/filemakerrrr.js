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
    #alwaysZip;
    #verbose;
    #lang;
    #listener = console.log;
    #downloadName = 'miFile';
    #zipFileFormat;

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;

    constructor(
        fileOrString = undefined,
        { verbose = false, alwaysZip = false, downloadName, lang = 'es' } = {},
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
        this.#lang = lang;

        if (typeof fileOrString === 'string') {
            this.#zipInput = fileOrString;
            this.zip().then(() => this.downloadZip('asdasdada'));
        }
    }

    forceIt(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
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
            this.#zipFileFormat = false;
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
        this.#zipFileFormat = true;

        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
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

    downloadZip(name = this.#downloadName) {
        fileDownload(name, this.#zipOutput, this.#zipFileFormat);
    }

    downloadUnzip(name = this.#downloadName) {
        fileDownload(name, this.#unzipOutput, false);
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
}
