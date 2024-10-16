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
    #stats;
    #settings;

    #zipInput = null;
    #zipOutput = null;
    #unzipFileBuffer = null;
    #unzipOutput = null;
    #zipFileFormat;

    constructor(
        { downloadName, alwaysZip, verbose, talkToMeCallbak, lang } = {},
        stringForFastZip = undefined,
    ) {
        this.#settings = {
            downloadName: downloadName ?? 'miFile',
            alwaysZip: alwaysZip ?? false,
            verbose: verbose ?? false,
            listener: talkToMeCallbak ?? console.log,
            lang: lang ?? 'es',
        };

        this.#stats = {
            // action: null, // "zip"/"unzip"
            // zipped: null, // true/false
            // timeStart: null, // new Date().now()
            // timeEnd: null, // new Date().now()
            // chars: null, // chars in string
            // textLength: null, // length of string
            // bytesStart: null, // number of bytes
            // bytesEnd: null, // number of bytes
            // zipRateEst: null, // float
            // zipRateReal: null, // float
        };

        if (typeof stringForFastZip === 'string') {
            this.#zipInput = stringForFastZip;
            this.#fastZip();
        }
    }

    get zipStats() {
        const publicStats = {};
        let statsAvailable = 0;

        for (const [key, value] of Object.entries(this.#stats)) {
            publicStats[key] = value;
            statsAvailable++;
        }

        if (!statsAvailable) {
            return message[this.#settings.lang].stats.notAvailable;
        }

        return publicStats;
    }

    get output() {
        return this.#unzipOutput;
    }

    async #fastZip() {
        try {
            await this.zip();
            this.downloadZip();
        } catch (error) {
            throw new Error(message.runtimeErr.zipping);
        }
    }

    flush() {
        this.#zipInput = null;
        this.#zipOutput = null;
        this.#unzipFileBuffer = null;
        this.#unzipOutput = null;
    }

    flushStats() {
        this.#stats = {};
    }

    forceIt(alwaysZip = true) {
        this.#settings.alwaysZip = alwaysZip;
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
        this.flushStats();

        this.#stats.action = 'zip';
        this.#stats.timeStart = new Date().getTime();
        this.#talkToYou(['zip', 'analize']);

        const { charsMap, charsUnicode } = await stringChecker(this.#zipInput);

        this.#stats.chars = charsMap.size;
        this.#stats.textLength = this.#zipInput.length;
        this.#stats.bytesStart = this.#zipInput.length + charsUnicode;

        const { should, rate } = zipForecast(
            this.#zipInput.length,
            charsMap.size,
            charsUnicode,
        );

        this.#stats.zipRateEst = rate;

        this.#talkToYou(['zip', 'rate', rate]);

        if (!this.#settings.alwaysZip && !should) {
            this.#talkToYou(['zip', 'willNotZip']);
            this.#zipOutput = this.#zipInput;
            this.#zipFileFormat = false;
            this.#stats.zipped = false;
            this.#stats.timeEnd = new Date().getTime();

            this.#stats.bytesEnd = this.#zipOutput.length;
            this.#stats.zipRateReal =
                this.#stats.bytesEnd / this.#stats.bytesStart;

            return this;
        }
        this.#stats.zipped = true;

        this.#talkToYou(['zip', 'willZip']);
        this.#talkToYou(['zip', 'zipMap']);

        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        this.#talkToYou(['zip', 'zipString']);

        const zippedString = await compressor(this.#zipInput, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipOutput = await binaryBufferForBrowser(binarySecuence);

        this.#stats.timeEnd = new Date().getTime();
        this.#stats.bytesEnd = this.#zipOutput.length;
        this.#stats.zipRateReal = this.#stats.bytesEnd / this.#stats.bytesStart;

        this.#zipFileFormat = true;

        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
    }

    async parseFile(file) {
        try {
            this.#stats.action = 'unzip';
            this.#talkToYou(['unzip', 'upload']);

            const fileData = await fileLoader(file);
            this.#unzipFileBuffer = await fileCheck(fileData);

            if (!this.#unzipFileBuffer) {
                this.#talkToYou(['unzip', 'fileFormarError']);

                new Error(message.runtimeErr.fileFormat);
            }

            this.#stats.zipped = this.#unzipFileBuffer.type === '.f4r';
            this.#stats.bytesStart = this.#unzipFileBuffer.file.length;

            return this.#unzipFileBuffer;
        } catch (err) {
            this.#talkToYou(['unzip', 'uploadError'], true);

            new Error(message.runtimeErr.onParse);
        }
    }

    async unzip() {
        try {
            this.#stats.timeStart = new Date().getTime();
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

            this.#stats.timeEnd = new Date().getTime();
            const { charsUnicode } = await stringChecker(this.#unzipOutput);
            this.#stats.bytesEnd = this.#unzipOutput.length + charsUnicode;

            return this.#unzipOutput;
        } catch {
            this.#talkToYou(['unzip', 'unzipError'], true);

            new Error(message.runtimeErr.unzipping);
        }
    }

    downloadZip(name = this.#settings.downloadName) {
        if (!this.#zipOutput) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);
        fileDownload(name, this.#zipOutput, this.#zipFileFormat);
    }

    downloadUnzip(name = this.#settings.downloadName) {
        if (!this.#unzipOutput) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);
        fileDownload(name, this.#unzipOutput, false);
    }

    talkToMe(verbose = true) {
        this.#settings.verbose = verbose;
        return this;
    }

    addListener(callback) {
        this.#settings.listener = callback;
        return this;
    }

    #talkToYou([process, key, args], always = false) {
        if (!always && !this.#settings.verbose) {
            return;
        }

        const baseOutput = message[this.#settings.lang][process][key];
        const finalOutput = args ? baseOutput(args) : baseOutput;
        this.#settings.listener(finalOutput);
    }
}
