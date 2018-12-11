import {Observable} from "rxjs";

export function watchTempHumidity(gpioNo) {
    const readSingle =  (observer) => {
        const {spawn} = require('child_process');
        const pyprog = spawn('python', [`${__dirname}/AdafruitDHT.py`,11, gpioNo]);
        pyprog.stdout.on('data', function (data) {
            observer.next({
                temp: '' + data,
                humidity: '' + data
            });
        });
        pyprog.stderr.on('data', (data) => {
            console.log("ERROR OCCURED reading temp and humidity", '' + data);
            observer.next({
                temp: null,
                humidity: null
            });
        });
    }
    return Observable.create(function (observer) {
        readSingle(observer);
    });
}
