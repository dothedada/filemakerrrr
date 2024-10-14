import { toBin } from '../utils/conversion.js';
import { version } from '../utils/units.js';

const fileDir = ({ ascii, asciiExt, unicode }, fixed = false) => {
    const compressed = !!(ascii.length + asciiExt.length + unicode.length);

    const versionBin = toBin(version, 3);
    const compressionFlags = [compressed, fixed, ascii, asciiExt, unicode]
        .map((flag) => Number(!!(Array.isArray(flag) ? flag.length : flag)))
        .join('');

    return `${versionBin}${compressionFlags}`;
};

export { fileDir };
