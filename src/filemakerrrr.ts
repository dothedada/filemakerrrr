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
import type { F4rSettings, F4rIO, F4rStats } from './types.js';

// TODO:
// 1. usar 0b010101010101 para binarios, no pasar a cadenas

export class Filemakerrrr {
    #stats: F4rStats = {};
    #settings: F4rSettings;
    #zipInfo: F4rIO = { in: null, out: null, zippedInput: null };

    constructor(
        {
            downloadName = 'miFile',
            alwaysZip = false,
            verbose = false,
            talkToMeCallbak = console.log,
            lang = 'es',
        }: Partial<F4rSettings> = {},
        stringForFastZip?: string,
    ) {
        this.#settings = {
            downloadName: downloadName,
            alwaysZip: alwaysZip,
            verbose: verbose,
            talkToMeCallbak: talkToMeCallbak,
            lang: lang,
        };

        if (stringForFastZip) {
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

    addListener(callback: (input: string) => void) {
        if (!callback) {
            new Error(runtimeErr.noParameter);
        }
        this.#settings.talkToMeCallbak = callback;
        return this;
    }

    flush() {
        this.#zipInfo = { in: null, out: null, zippedInput: null };
    }

    flushStats() {
        this.#stats = {};
    }

    stringToZip(string: string) {
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
        if (!this.#zipInfo.in || typeof this.#zipInfo.in !== 'string') {
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
                    if (!this.timeEnd || !this.timeStart) {
                        return 0;
                    }
                    return this.timeEnd - this.timeStart;
                },
                get zipRateReal() {
                    if (!this.bytesEnd || !this.bytesStart) {
                        return 0;
                    }
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
                if (!this.timeEnd || !this.timeStart) {
                    return 0;
                }
                return this.timeEnd - this.timeStart;
            },
            get zipRateReal() {
                if (!this.bytesEnd || !this.bytesStart) {
                    return 0;
                }
                return this.bytesEnd / this.bytesStart;
            },
        };
        this.#talkToYou(['zip', 'readyToDownload']);

        return this;
    }

    async parseFile(file: File) {
        this.#talkToYou(['upload', 'upload']);

        try {
            const fileData = await fileLoader(file);
            const checkType = await fileCheck(fileData);

            if (checkType[0] === null) {
                this.#talkToYou(['upload', 'fileFormarError']);
                new Error(runtimeErr.fileFormat);
            }

            const [data, type] = checkType;
            this.flush();
            this.#zipInfo.in = data;

            this.#zipInfo.zippedInput = type === '.f4r';

            this.#talkToYou(['upload', 'uploaded']);
            return this.#zipInfo.in;
        } catch (err) {
            this.#talkToYou(['upload', 'uploadError'], true);

            new Error(runtimeErr.onParse);
        }
    }

    async unzip() {
        if (this.#zipInfo.in === null) {
            this.#talkToYou(['unzip', 'alreadyUnzipped'], true);
            return;
        }
        if (typeof this.#zipInfo.in === 'string') {
            this.#talkToYou(['unzip', 'alreadyUnzipped'], true);
            return;
        }
        try {
            this.flushStats();
            this.#stats = {
                action: 'unzip',
                zipped: this.#zipInfo.zippedInput ?? false,
                timeStart: new Date().getTime(),
                initialBytes: this.#zipInfo.in.length,
                get bytesStart() {
                    return (this.initialBytes ?? 0) + (this.zipped ? 3 : 0);
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
                    return (this.textLength ?? 0) + charsUnicode;
                },
                get totalTimeMs() {
                    return (this.timeEnd ?? 0) - (this.timeStart ?? 0);
                },
            };

            return this.#zipInfo.out;
        } catch {
            this.#talkToYou(['unzip', 'unzipError'], true);

            new Error(runtimeErr.unzipping);
        }
    }

    download(name: string = this.#settings.downloadName) {
        if (!this.#zipInfo.out) {
            this.#talkToYou(['download', 'nothing']);
            return;
        }
        this.#talkToYou(['download', 'start']);

        fileDownload(name, this.#zipInfo.out, !this.#zipInfo.zippedInput);
    }

    #talkToYou(
        [process, key, args]: [process: string, key: string, args?: number],
        always = false,
    ) {
        if (!always && !this.#settings.verbose) {
            return;
        }

        const baseOutput = message[this.#settings.lang][process][key];
        const finalOutput =
            typeof baseOutput === 'function' && args
                ? baseOutput(args)
                : (baseOutput as string);
        this.#settings.talkToMeCallbak(finalOutput);
    }

    get viewStats(): F4rStats | string {
        const publicStats: F4rStats = {};
        let statsAvailable = 0;

        for (const [key, value] of Object.entries(this.#stats)) {
            const typedKey = key as keyof F4rStats;

            if (typeof value === typeof publicStats[typedKey]) {
                publicStats[typedKey] = value;
                statsAvailable++;
            }
        }

        if (!statsAvailable) {
            return message[this.#settings.lang].stats.notAvailable as string;
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
