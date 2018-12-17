import {execSync} from 'child_process';

const init = (gpioPhysicalNo) => {
    execSync(`gpio -1 mode ${gpioPhysicalNo} out`);
};

const switchOn =  (gpioPhysicalNo) => {
    return () => {
        console.log('switchON');
        execSync(`gpio -1 write ${gpioPhysicalNo} 0`);
    };
}

const switchOff =  (gpioPhysicalNo) => {
    return () => {
        console.log('switchOFF');
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
        console.log(signalLength, signalLength + pauseLength);
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

    };

    const createSignal = function(melody){
        if(melody.length < 2) {
            throw new Error("Melody should contain at least two elements" )
        }
        const impulsLength = melody[i++];
        const pauseLength = melody[i++];
        if(!impulsLength ||  !pauseLength) { i = 0; createSignal(melody)  }
        stopTimers = signalController(impulsLength, pauseLength,function(){
            createSignal(melody);
        });
        return stopTimers;
    };
    return {
        start: createSignal,
        stop: stopSignal
    };
}
