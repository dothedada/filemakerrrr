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
import { runtimeErr } from './utils/errors.js';

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
        if (!callback) {
            new Error(runtimeErr.noParameter);
        }
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

        this.flushStats();
        this.#stats.timeStart = new Date().getTime();
        this.#talkToYou(['zip', 'analize']);

        const { charsMap, charsUnicode } = await stringChecker(
            this.#zipInfo.in,
        );

        const { should, rate } = zipForecast(
            this.#zipInfo.in.length,
            charsMap.size,
            charsUnicode,
        );

        this.#stats = {
            ...this.#stats,
            action: 'zip',
            chars: charsMap.size,
            textLength: this.#zipInfo.in.length,
            bytesStart: this.#zipInfo.in.length + charsUnicode,
            zipRateEst: rate,
        };
        this.#talkToYou(['zip', 'rate', rate]);

        if (!this.#settings.alwaysZip && !should) {
            this.#zipInfo.out = this.#zipInfo.in;
            this.#stats = {
                ...this.#stats,
                zipped: false,
                timeEnd: new Date().getTime(),
                bytesEnd: this.#zipInfo.out.length,
                get totalTimeMs() {
                    return this.timeEnd - this.timeStart;
                },
                get zipRateReal() {
                    return this.bytesEnd / this.bytesStart;
                },
            };
            this.#talkToYou(['zip', 'willNotZip']);

            return this;
        }
        this.#talkToYou(['zip', 'willZip']);
        this.#talkToYou(['zip', 'zipMap']);

        const charsHeap = await gardener(charsMap);
        const zippedCharMap = compressionTable(charsHeap);

        this.#talkToYou(['zip', 'zipString']);

        const zippedString = await compressor(this.#zipInfo.in, zippedCharMap);
        const binarySecuence = assembler(zippedCharMap, zippedString);
        this.#zipInfo.out = await binaryBufferForBrowser(binarySecuence);

        this.#stats = {
            ...this.#stats,
            zipped: true,
            timeEnd: new Date().getTime(),
            bytesEnd: this.#zipInfo.out.length,
            get totalTimeMs() {
                return this.timeEnd - this.timeStart;
            },
            get zipRateReal() {
                return this.bytesEnd / this.bytesStart;
            },
        };
        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
    }

    async parseFile(file) {
        this.#talkToYou(['upload', 'upload']);

        try {
            const fileData = await fileLoader(file);
            const [data, type] = await fileCheck(fileData);
            this.flush();
            this.#zipInfo.in = data;

            if (!this.#zipInfo.in) {
                this.#talkToYou(['upload', 'fileFormarError']);

                new Error(runtimeErr.fileFormat);
            }
            this.#zipInfo.zippedInput = type === '.f4r';

            this.#talkToYou(['upload', 'uploaded']);
            return this.#zipInfo.in;
        } catch (err) {
            this.#talkToYou(['upload', 'uploadError'], true);

            new Error(runtimeErr.onParse);
        }
    }

    async unzip() {
        if (!this.#zipInfo.zippedInput) {
            this.#talkToYou(['unzip', 'alreadyUnzipped'], true);
            return;
        }
        try {
            this.flushStats();
            this.#stats = {
                action: 'unzip',
                zipped: this.#zipInfo.zippedInput,
                timeStart: new Date().getTime(),
                initialBytes: this.#zipInfo.in.length,
                get bytesStart() {
                    return this.initialBytes + (this.zipped ? 3 : 0);
                },
            };
            this.#talkToYou(['unzip', 'parsingBuffer']);

            const binaryString = await parseBufferToBin(this.#zipInfo.in);

            this.#talkToYou(['unzip', 'unzippingString']);

            const unzippedString = await parseBinToChar(binaryString);

            this.#zipInfo.out = unzippedString;

            this.#talkToYou(['unzip', 'readyToDownload']);
            const { charsUnicode } = await stringChecker(this.#zipInfo.out);
            this.#stats = {
                ...this.#stats,
                timeEnd: new Date().getTime(),
                textLength: this.#zipInfo.out.length,
                get bytesEnd() {
                    return this.textLength + charsUnicode;
                },
                get totalTimeMs() {
                    return this.timeEnd - this.timeStart;
                },
            };

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

    get viewStats() {
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

    get input() {
        return this.#zipInfo.in;
    }

    get output() {
        return this.#zipInfo.out;
    }
}