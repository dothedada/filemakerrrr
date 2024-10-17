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
import { runtimeErr } from '../utils/errors.js';

// TODO:
// 3. ajustar constructor input
// 2.  implementacion metodo propio para verboso
// 4. Readme
// 3. Montaje de la biblioteca
// 5. npm

export class Filemakerrrr {
    #stats = {};
    #settings;
    #zipInfo = { in: null, out: null, zippedInput: null };

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

        if (typeof stringForFastZip === 'string') {
            this.#zipInfo.in = stringForFastZip;

            this.#fastZip();
        }
    }

    async #fastZip() {
        try {
            await this.zip();
            this.download();
        } catch (error) {
            throw new Error(runtimeErr.zipping);
        }
    }

    forceIt(alwaysZip = true) {
        this.#settings.alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.#settings.verbose = verbose;
        return this;
    }

    addListener(callback) {
        this.#settings.listener = callback;
        return this;
    }

    flush() {
        this.#zipInfo = { in: null, out: null, zippedInput: null };
    }

    flushStats() {
        this.#stats = {};
    }

    stringToZip(string) {
        if (!string) {
            throw new Error(runtimeErr.noParameter);
        }
        if (typeof string !== 'string') {
            throw new Error(runtimeErr.stringExpected);
        }

        this.flush();
        this.#zipInfo.in = string;

        return this;
    }

    async zip() {
        if (!this.#zipInfo.in) {
            throw new Error(runtimeErr.stringExpected);
        }

        if (this.#zipInfo.zippedInput) {
            this.#talkToYou(['zip', 'alreadyZipped'], true);
            return;
        }
        this.#stats.action = 'zip';
        this.#stats.timeStart = new Date().getTime();
        this.#talkToYou(['zip', 'analize']);

        this.flushStats();
        const { charsMap, charsUnicode } = await stringChecker(
            this.#zipInfo.in,
        );

        this.#stats.chars = charsMap.size;
        this.#stats.textLength = this.#zipInfo.in.length;
        this.#stats.bytesStart = this.#zipInfo.in.length + charsUnicode;

        const { should, rate } = zipForecast(
            this.#zipInfo.in.length,
            charsMap.size,
            charsUnicode,
        );

        this.#stats.zipRateEst = rate;
        this.#talkToYou(['zip', 'rate', rate]);

        if (!this.#settings.alwaysZip && !should) {
            this.#zipInfo.out = this.#zipInfo.in;
            this.#stats.zipped = false;
            this.#stats.timeEnd = new Date().getTime();
            this.#stats.bytesEnd = this.#zipInfo.out.length;
            this.#stats.zipRateReal =
                this.#stats.bytesEnd / this.#stats.bytesStart;
            this.#talkToYou(['zip', 'willNotZip']);

            return this;
        }
        this.#stats.zipped = true;
        this.#talkToYou(['zip', 'willZip']);
        this.#talkToYou(['zip', 'zipMap']);

        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        this.#talkToYou(['zip', 'zipString']);

        const zippedString = await compressor(this.#zipInfo.in, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipInfo.out = await binaryBufferForBrowser(binarySecuence);

        this.#stats.timeEnd = new Date().getTime();
        this.#stats.bytesEnd = this.#zipInfo.out.length;
        this.#stats.zipRateReal = this.#stats.bytesEnd / this.#stats.bytesStart;
        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
    }

    async parseFile(file) {
        this.flush();
        this.flushStats();

        try {
            const fileData = await fileLoader(file);
            const [data, type] = await fileCheck(fileData);
            this.#zipInfo.in = data;

            if (!this.#zipInfo.in) {
                this.#talkToYou(['unzip', 'fileFormarError']);

                new Error(runtimeErr.fileFormat);
            }
            this.#zipInfo.zippedInput = type === '.f4r';

            this.#stats.action = 'unzip';
            this.#stats.zipped = this.#zipInfo.zippedInput;
            this.#stats.bytesStart =
                this.#zipInfo.in.length + (type === '.f4r' ? 3 : 0);
            this.#talkToYou(['unzip', 'upload']);

            return this.#zipInfo.in;
        } catch (err) {
            this.#talkToYou(['unzip', 'uploadError'], true);

            new Error(runtimeErr.onParse);
        }
    }

    async unzip() {
        if (!this.#zipInfo.zippedInput) {
            this.#talkToYou(['unzip', 'alreadyUnzipped'], true);
            return;
        }
        try {
            this.#stats.timeStart = new Date().getTime();
            this.#talkToYou(['unzip', 'parsingBuffer']);

            const binaryString = await parseBufferToBin(this.#zipInfo.in);

            this.#talkToYou(['unzip', 'unzippingString']);

            const unzippedString = await parseBinToChar(binaryString);

            this.#zipInfo.out = unzippedString;

            this.#talkToYou(['unzip', 'readyToDownload']);
            this.#stats.timeEnd = new Date().getTime();
            this.#stats.textLength = this.#zipInfo.out.length;
            const { charsUnicode } = await stringChecker(this.#zipInfo.out);
            this.#stats.bytesEnd = this.#zipInfo.out.length + charsUnicode;

            return this.#zipInfo.out;
        } catch {
            this.#talkToYou(['unzip', 'unzipError'], true);

            new Error(runtimeErr.unzipping);
        }
    }

    download(name = this.#settings.downloadName) {
        if (!this.#zipInfo.out) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);

        fileDownload(name, this.#zipInfo.out, !this.#zipInfo.zippedInput);
    }

    #talkToYou([process, key, args], always = false) {
        if (!always && !this.#settings.verbose) {
            return;
        }

        const baseOutput = message[this.#settings.lang][process][key];
        const finalOutput = args ? baseOutput(args) : baseOutput;
        this.#settings.listener(finalOutput);
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
        return this.#zipInfo.out;
    }
}
