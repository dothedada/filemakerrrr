import { errorLib } from './errorLibrary';

const binaryBufferForBrowser = (string) => {
    if (typeof string !== 'string') {
        errorLib.parameterIsMissing();
    }
    if (/[2-9a-zA-Z]/g.test(string)) {
        errorLib.dataExpected('Binary string', string);
    }

    const bytesNeeded = Math.ceil(string.length / 8);
    const bytesArray = new Uint8Array(bytesNeeded + 1);
    // add last byte trim
    bytesArray[bytesArray.length - 1] = Number.parseInt(string.length % 8);

    for (let i = 0; i < bytesNeeded; i++) {
        let currentByte = string.slice(8 * i, 8 * i + 8);

        if (currentByte.length < 8) {
            currentByte = currentByte.padEnd(8, '0');
        }

        bytesArray[i] = Number.parseInt(currentByte, 2);
    }

    return bytesArray;
};

export { binaryBufferForBrowser };
