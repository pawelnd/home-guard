import {Observable} from 'rxjs';
import {map, filter} from "rxjs/operators";

const gpio = require('rpi-gpio');

const GPIOState$ = Observable.create(
    (observer) => {
        gpio.on('change', ({channel, value}) => {
            observer.next({channel, value})
        })
    }
)


export function gpioWatch(gpioPhysicalNo, intervalTime = 10) {
    gpio.setup(gpioPhysicalNo, gpio.DIR_IN, gpio.EDGE_BOTH);
    return GPIOState$.pipe(
        filter(({channel}) => channel != gpioPhysicalNo),
        map(({value}) => value)
    )
}
