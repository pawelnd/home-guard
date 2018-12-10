import { Observable} from 'rxjs';

export function watchIsWater() {
    const gpio = require('rpi-gpio');
    gpio.setup(8, gpio.DIR_IN, gpio.EDGE_BOTH, () => console.log('WATER SENSOR INITIALIZED'));
    return Observable.create(function(observer) {
        gpio.on('change', function(channel, value) {
            observer.next(value);
        });
    });
 }
