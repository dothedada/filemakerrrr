import { errorLib } from './errorLibrary';
import { toBin } from './toBinary';
import { version } from './units';

export const fileHeader = (ascii, asciiExt, unicode, fixed = false) => {
    if (!ascii || !asciiExt || !unicode) {
        errorLib.parameterIsMissing();
    }

    const compressed = !!(ascii.length + asciiExt.length + unicode.length);

    const versionBin = toBin(version, 3);
    const compressionFlags = [compressed, fixed, ascii, asciiExt, unicode]
        .map((flag) => Number(!!(Array.isArray(flag) ? flag.length : flag)))
        .join('');

    return `${versionBin}${compressionFlags}`;
};
