import { stringChecker } from './charcounter';
import { errorLib } from './errorLibrary';
import { compressionForecast } from './compressionEval';
import { Heap } from './minHeap';
import { treeMaker } from './treeMaker';
import { compressionTable } from './compressionTable';
import { arrangeChars } from './charMapToBin';
import { compressor } from './compressor';

export class Filemakerrrr {
    constructor(string = '', settingObject = {}) {
        const { alwaysZip, verbose } = settingObject;
        this.alwaysZip = alwaysZip ?? false;
        this.verbose = verbose ?? false;
        this.stringToWork = string;
        this.zippedString = null;
    }

    stringToZip(string) {
        if (!string) {
            errorLib.parameterIsMissing();
        }
        if (typeof string !== 'string') {
            errorLib.dataExpected('string', string);
        }

        this.stringToWork = string;
        return this;
    }

    forceZip(alwaysZip = true) {
        this.alwaysZip = alwaysZip;
        return this;
    }

    talkToMe(verbose = true) {
        this.verbose = verbose;
    }

    zipIt() {
        const { charsMap, charsUnicode } = stringChecker(this.stringToWork);

        const { should, rate } = compressionForecast(
            this.stringToWork.length,
            charsMap.size,
            charsUnicode,
        );

        // console.log(should, rate);

        const charsHeap = new Heap();
        for (const keyValue of charsMap) {
            charsHeap.push(keyValue);
        }

        // console.log(charsHeap);

        treeMaker(charsHeap);
        const zipMap = compressionTable(charsHeap);

        // console.log(zipMap);
        const zippedString = compressor(this.stringToWork, zipMap);

        const arrangedChars = arrangeChars(zipMap);

        console.log(arrangedChars);
        console.log(zippedString);
    }
}
