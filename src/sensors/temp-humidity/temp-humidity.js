import {interval} from "rxjs";
import { map } from 'rxjs/operators';
const { execSync } = require('child_process');

const parser = (response) => {
    const REGEXP = /Temp=([^*]*).*Humidity=([^%]*)/g;
    let matches = REGEXP.exec(response);
    return {
        temp:matches[1]?matches[1]:null,
        humidity:matches[2]?matches[2]:null,
    }
}

function executePythonScript(gpioNo) {
    return execSync(`python "${__dirname}/AdafruitDHT.py" 11 ${gpioNo}`);
}

const reader =  (gpioNo) => {
    return () => {
        const response = executePythonScript(gpioNo);
        return parser(response);
    }
}

export function watchTempHumidity$(gpioNo, delay = 10000) {
    return interval(delay).pipe(
        map(() => reader(gpioNo)())
    )
}
