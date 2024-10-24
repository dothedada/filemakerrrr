import type { BitsExtension, FileExtension, Signature } from './types';

export const signature: Signature = ['F', '4', 'R'];
export const byteSize: BitsExtension = { ascii: 7, asciiExt: 8, unicode: 16 };
export const fileExt: FileExtension = { zipped: '.f4r', plain: '.txt' };
export const version = 1;
export const zippedCharMaxLength = 5;
export const byesForCharInZipMap = 3;
