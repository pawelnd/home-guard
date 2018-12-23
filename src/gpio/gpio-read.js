import {first, from, merge, Observable, pipe, tap} from 'rxjs';
import {map, filter, switchMap} from "rxjs/operators";

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
const GPIOInitialStateReader = (pin) => Observable.create(
    (observer) => {
        gpio.read(pin, (err,val) => {
            observer.next(val);
        });
    }
)

const doSetup = (pin) => new Promise((resolve)=>{
    gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, () => {
        resolve(pin);
    });
})

switchMap(()=> GPIOState$),
    filter(({channel}) => channel == pin),
    map(({value}) => value)
export function gpioWatch(pin) {
    const changeListener = GPIOState$.pipe(
        filter(({channel}) => channel == pin),
        map(({value}) => value)
    );

    const initialListener = GPIOInitialStateReader(pin);

    let setupPromise = doSetup(pin);
    return from(setupPromise).pipe(
        switchMap(()=> merge(changeListener,initialListener))
    );

}
