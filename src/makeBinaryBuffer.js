const binaryBufferForBrowser = (string) =>
    new Promise((resolve, reject) => {
        const bytesNeeded = Math.ceil(string.length / 8);
        const bytesArray = new Uint8Array(bytesNeeded + 1);

        bytesArray[bytesArray.length - 1] = Number.parseInt(string.length % 8);

        for (let i = 0; i < bytesNeeded; i++) {
            let currentByte = string.slice(8 * i, 8 * i + 8);

            if (currentByte.length < 8) {
                currentByte = currentByte.padEnd(8, '0');
            }

            bytesArray[i] = Number.parseInt(currentByte, 2);
        }
        if (!bytesArray) {
            reject(new Error('Cannot create the bytes array'));
        }
        resolve(bytesArray);
    });

export { binaryBufferForBrowser };
