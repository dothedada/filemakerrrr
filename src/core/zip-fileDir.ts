import { toBin } from '../utils/conversion.js';
import { version } from '../utils/units.js';
import type { StandardsArranged } from './types.js';

const fileDir = (arrangedChars: StandardsArranged, fixed = false): string => {
    const { ascii, asciiExt, unicode } = arrangedChars;
    const compressed = !!(ascii.length + asciiExt.length + unicode.length);

    const versionBin = toBin(version, 3);
    const compressionFlags = [compressed, fixed, ascii, asciiExt, unicode]
        .map((flag) => Number(!!(Array.isArray(flag) ? flag.length : flag)))
        .join('');

    return `${versionBin}${compressionFlags}`;
};

export { fileDir };
