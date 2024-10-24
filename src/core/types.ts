export type ZipMap = Map<string, number>;
export type ZipMapBin = Map<string, string>;
export interface StandardsArranged {
    ascii: string[];
    asciiExt: string[];
    unicode: string[];
}
export interface HuffmanNode {
    character?: string;
    count: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;
}

export interface HeaderBin {
    asciiCount: number;
    asciiExtCount: number;
    unicodeCount: number;
    mapStart: number;
}
export type UnzipMap = Map<string, string>;
