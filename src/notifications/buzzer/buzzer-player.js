import {execSync} from 'child_process';

const init = (gpioPhysicalNo) => {
    execSync(`gpio -1 mode ${gpioPhysicalNo} out`);
};

const switchOn =  (gpioPhysicalNo) => {
    return () => execSync(`gpio -1 write ${gpioPhysicalNo} 0`);
}

const switchOff =  (gpioPhysicalNo) => {
    return () => execSync(`gpio -1 write ${gpioPhysicalNo} 1`);
}

const configure = (onSignal,onPause) => {
    return (signalLength,pauseLength, callback) => {
        setTimeout(onSignal,0);
        setTimeout(onPause,signalLength);
        setTimeout(callback,signalLength + pauseLength);
    }
}

export function getBuzzerPlayer(gpioPhysicalNo) {
    init(gpioPhysicalNo);
    let signalController = configure(switchOn(gpioPhysicalNo),switchOff(gpioPhysicalNo));
    let i = 0;
    const createSignal = function(melody){
        const impulsLength = melody[i++];
        const pauseLength = melody[i++];
        if(!impulsLength ||  !pauseLength) { return; }
        signalController(impulsLength,pauseLength,function(){
            createSignal(melody);
        })
    };
    return createSignal;
}
