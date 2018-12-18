import {execSync} from 'child_process';

const init = (gpioPhysicalNo) => {
    execSync(`gpio -1 mode ${gpioPhysicalNo} out`);
};

const switchOn =  (gpioPhysicalNo) => {
    return () => {
        execSync(`gpio -1 write ${gpioPhysicalNo} 0`);
    };
}

const switchOff =  (gpioPhysicalNo) => {
    return () => {
        execSync(`gpio -1 write ${gpioPhysicalNo} 1`);
    };
}

const stopSignal = (timeouts) => {
    return () => {
        for (const timeoutHandler of timeouts) {
            clearTimeout(timeoutHandler);
        }
    }
}

const configureGPIOs = (doSignal, doPause) => {
    return (signalLength, pauseLength, callback) => {
        const timeouts = [
            setTimeout(doSignal, 0),
            setTimeout(doPause, signalLength),
            setTimeout(callback, signalLength + pauseLength)
        ];
        return stopSignal(timeouts);
    }
}

export function getBuzzerPlayer(gpioPhysicalNo) {
    init(gpioPhysicalNo);
    let signalController = configureGPIOs(switchOn(gpioPhysicalNo),switchOff(gpioPhysicalNo));
    let i = 0;
    let stopTimers = null;
    const stopSignal = () => {
        if(stopTimers){
            stopTimers();
        }
        switchOff(gpioPhysicalNo)();
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
        start: createSignal,
        stop: stopSignal
    };
}
