import {Observable,of, from } from 'rxjs';

export function watchIsWater() {  
    var gpio = require('rpi-gpio');
    gpio.setup(8, gpio.DIR_IN, gpio.EDGE_BOTH);

    return Observable.create(observer => {
        console.log('initialized');
        gpio.on('change', function(channel, value) {
            console.log('Channel ' + channel + ' value is now ' + value);          
            observer.next(value);
        });
       
    });
 }
