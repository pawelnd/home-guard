import {interval, Observable} from 'rxjs';
import {switchMap, map} from "rxjs/operators";
import {execSync} from 'child_process';
import {GPIO_MODE} from "./gpio-mode";

function init(gpioPhysicalNo, observer, mode) {
    const resp = execSync(`gpio -1 mode ${gpioPhysicalNo} ${mode}`);
    return observer.next({resp, gpioPhysicalNo});
}

function read(gpioPhysicalNo) {
    let resp = execSync(`gpio -1 read ${gpioPhysicalNo}`);
    return parseInt(resp);
}

export function gpioWatch(gpioPhysicalNo,mode=GPIO_MODE.IN,intervalTime = 10) {
    return Observable.create(
        (observer) => init(gpioPhysicalNo, observer, mode)
    ).pipe(
        switchMap(() => interval(intervalTime)),
        map(() => read(gpioPhysicalNo))
    );
}
