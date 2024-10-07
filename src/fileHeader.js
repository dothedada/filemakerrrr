import { errorLib } from './errorLibrary';
import { toBin } from './toBinary';
import { version } from './units';

export const fileHeader = (
    ascii,
    asciiExt,
    unicode,
    compressed = true,
    fixed = false,
) => {
    if (!ascii || !asciiExt || !unicode || compressed) {
        errorLib.parameterIsMissing();
    }

    const versionBin = toBin(version, 3);
    const compressionFlags = [compressed, fixed, ascii, asciiExt, unicode]
        .map((flag) => Number(!!(Array.isArray(flag) ? flag.length : flag)))
        .join('');

    return `${versionBin}${compressionFlags}`;
};
