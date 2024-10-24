import type { message } from './utils/messages';

type validLang = keyof typeof message;

export interface F4rSettings {
    downloadName: string;
    alwaysZip: boolean;
    verbose: boolean;
    talkToMeCallbak: (input: string) => void;
    lang: validLang;
}

export interface F4rIO {
    in: null | string | Uint8Array;
    out: null | string | Uint8Array;
    zippedInput: null | boolean;
}

export interface F4rStats {
    timeStart?: number;
    action?: string;
    chars?: number;
    textLength?: number;
    bytesStart?: number;
    zipRateEst?: number;
    zipped?: boolean;
    timeEnd?: number;
    initialBytes?: number;
    bytesEnd?: number;
    totalTimeMs?: number;
    zipRateReal?: number;
}
