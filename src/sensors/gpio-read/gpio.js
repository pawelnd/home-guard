import {interval, Observable} from 'rxjs';
import {switchMap, map} from "rxjs/operators";
import {execSync} from 'child_process';

function init(gpioPhysicalNo, observer) {
    const resp = execSync(`gpio -1 mode ${gpioPhysicalNo} in`);
    return observer.next({resp, gpioPhysicalNo});
}

function read(gpioPhysicalNo) {
    let resp = execSync(`gpio -1 read ${gpioPhysicalNo}`);
    return parseInt(resp);
}

export function gpioWatch(gpioPhysicalNo,intervalTime = 500) {
    return Observable.create(
        (observer) => init(gpioPhysicalNo, observer)
    ).pipe(
        switchMap(() => interval(intervalTime)),
        map(() => read(gpioPhysicalNo))
    );
}
