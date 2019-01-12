import {getPinOutputController} from "../../gpio/gpio-write";
import {BUZZER_MELODIES} from "./buzzer-melodies";

const cancelSignal = (timeouts) => {
    return () => {
        for (const timeoutHandler of timeouts) {
            clearTimeout(timeoutHandler);
        }
    }
}

const startSignal = (pinOutputController) => () => {
    pinOutputController.setLow();
}

const stopSignal = (pinOutputController) => () => {
    pinOutputController.setHigh();
}

const configure = (doSignal, doPause) => {
    return (signalLength, pauseLength, callback) => {
        const timeouts = [
            setTimeout(doSignal, 0),
            setTimeout(doPause, signalLength),
            setTimeout(callback, signalLength + pauseLength)
        ];
        return cancelSignal(timeouts);
    }
}

export function getBuzzerPlayer(pin) {
    let pinOutputController = getPinOutputController(pin);
    let signalController = configure(startSignal(pinOutputController),stopSignal(pinOutputController));
    let i = 0;
    let stopTimers = null;

    const cancelSignal = () => {
        if(stopTimers){
            stopTimers();
        }
        pinOutputController.setHigh();
    };

    const createSignal = function(melody){
        if(melody.length < 2) {
            throw new Error("Melody should contain at least two elements" )
        }
        const impulsLength = melody[i++];
        const pauseLength = melody[i++];
        if(!impulsLength ||  !pauseLength) { i = 0; createSignal(melody); return;  }
        stopTimers = signalController(impulsLength, pauseLength,function(){
            createSignal(melody);
        });
    };
    return {
        start: (melody) => {
            cancelSignal();
            createSignal(melody);
        },
        stop: cancelSignal
    };
}
