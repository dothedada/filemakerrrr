import { stringChecker } from './io/charCounter.js';
import { zipForecast } from './io/zipForecast.js';
import { binaryBufferForBrowser } from './io/parseBinToBuffer.js';
import { fileLoader } from './io/fileLoader.js';
import { fileCheck } from './io/fileTypeCheck.js';
import { fileDownload } from './io/fileDownload.js';
import { parseBufferToBin } from './io/parseBufferToBin.js';
import { gardener } from './core/zip-gardener.js';
import { compressionTable } from './core/zip-compressionTable.js';
import { compressor } from './core/zip-compressor.js';
import { assembler } from './core/zip-assembler.js';
import { parseBinToChar } from './core/unzip-parseBinToChar.js';
import { message } from './utils/messages.js';

// TODO:
// 1. stats
// 2. página demo
// 4. Readme
// 3. Montaje de la biblioteca
// 5. npm

export class Filemakerrrr {
    #downloadName;
    #alwaysZip;
    #verbose;
    #listener;
    #lang;

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;
    #zipFileFormat;

    #stats = {
        action: null, // "zip"/"unzip"
        zipped: null, // true/false
        timeStart: null, // new Date().now()
        timeEnd: null, // new Date().now()
        chars: null, // chars in string
        textLength: null, // length of string
        bytesStart: null, // number of bytes
        bytesEnd: null, // number of bytes
        compressionRate: null, // float
    };

    constructor(
        fileOrString = undefined,
        { downloadName, alwaysZip, verbose, talkToMeCallbak, lang } = {},
    ) {
        this.#downloadName = downloadName ?? 'miFile';
        this.#alwaysZip = alwaysZip ?? false;
        this.#verbose = verbose ?? false;
        this.#listener = talkToMeCallbak ?? console.log;
        this.#lang = lang ?? 'es';

        if (typeof fileOrString === 'string') {
            this.#zipInput = fileOrString;
            this.#fastZip();
        }
    }

    get zipStats() {
        const publicStats = {};
        let statsAvailable = 0;

        for (const [key, value] of Object.entries(this.#stats)) {
            if (!value) {
                continue;
            }
            publicStats[key] = value;
            statsAvailable++;
        }

        if (!statsAvailable) {
            return message[this.#lang].stats.notAvailable;
        }

        return publicStats;
    }

    #fastZip() {
        this.zip()
            .then(() => this.downloadZip())
            .catch(() => {
                throw new Error(message.runtimeErr.zipping);
            });
    }

    flush() {
        this.#zipInput = null;
        this.#zipOutput = null;
        this.#unzipFileBuffer = null;
        this.#unzipOutput = null;
    }

    forceIt(alwaysZip = true) {
        this.#alwaysZip = alwaysZip;
        return this;
    }

    stringToZip(string) {
        if (!string) {
            throw new Error(message.runtimeErr.noParameter);
        }
        if (typeof string !== 'string') {
            throw new Error(message.runtimeErr.stringExpected);
        }

        this.#zipInput = string;
        return this;
    }

    async zip() {
        if (!this.#zipInput) {
            throw new Error(message.runtimeErr.stringExpected);
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
        try {
            this.#talkToYou(['unzip', 'upload']);

            const fileData = await fileLoader(file);
            this.#unzipFileBuffer = await fileCheck(fileData);
            // this.#unzipFileBuffer = fileCheck(fileData);

            if (!this.#unzipFileBuffer) {
                this.#talkToYou(['unzip', 'fileFormarError']);

                new Error(message.runtimeErr.fileFormat);
            }

            return this.#unzipFileBuffer;
        } catch (err) {
            this.#talkToYou(['unzip', 'uploadError'], true);

            new Error(message.runtimeErr.onParse);
        }
    }

    async unzip() {
        try {
            if (this.#unzipFileBuffer.type === '.f4r') {
                this.#talkToYou(['unzip', 'parsingBuffer']);

                const binaryString = await parseBufferToBin(
                    this.#unzipFileBuffer.file,
                );

                this.#talkToYou(['unzip', 'unzippingString']);

                const unzippedString = await parseBinToChar(binaryString);
                this.#unzipOutput = unzippedString;

                this.#talkToYou(['unzip', 'readyToDownload']);
            } else {
                this.#unzipOutput = this.#unzipFileBuffer.file;
            }

            return unzippedString;
        } catch {
            this.#talkToYou(['unzip', 'unzipError'], true);

            new Error(message.runtimeErr.unzipping);
        }
    }

    downloadZip(name = this.#downloadName) {
        if (!this.#zipOutput) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);
        fileDownload(name, this.#zipOutput, this.#zipFileFormat);
    }

    downloadUnzip(name = this.#downloadName) {
        if (!this.#unzipOutput) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);
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
