import {first, Observable, tap} from 'rxjs';
import {map, filter} from "rxjs/operators";

const gpio = require('rpi-gpio');

const bindObserverToChange = (observer) => {
    return (channel, value) => {
        observer.next({channel, value})
    }

}
const GPIOState$ = Observable.create(
    (observer) => {
        gpio.on('change', bindObserverToChange(observer));
    }
)

export function gpioWatch(gpioPhysicalNo) {
    gpio.setup(gpioPhysicalNo, gpio.DIR_IN, gpio.EDGE_BOTH);
    return GPIOState$.pipe(
        filter(({channel}) => channel == gpioPhysicalNo),
        map(({value}) => value)
    )
}
