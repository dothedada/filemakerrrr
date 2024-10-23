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
    left?: HuffmanNode | null;
    right?: HuffmanNode | null;
}
export interface HuffmanTree {
    chars: HuffmanNode[];
    size: number;
    pop: () => HuffmanNode;
    push: (
        data: HuffmanNode | [string, number],
    ) => Omit<HuffmanNode, 'left' | 'right'>;
}

export interface HeaderBin {
    asciiCount: number;
    asciiExtCount: number;
    unicodeCount: number;
    mapStart: number;
}
export type UnzipMap = Map<string, string>;
