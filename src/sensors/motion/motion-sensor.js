import { Observable} from 'rxjs';

export function watchIsMotion(gpioNo) {
    const Gpio = require('onoff').Gpio;
    var pushButton = new Gpio(gpioNo, 'in', 'both'); //
    return Observable.create(function (observer) {
        setInterval(function name(params) {
            observer.next(pushButton.readSync());
        }, 100)
    });
 }
