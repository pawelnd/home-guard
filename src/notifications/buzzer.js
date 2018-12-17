import {execSync} from 'child_process';
const MELODY = [1000,2000,3000,4000, 5000, 6000];

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

export function play(gpioPhysicalNo) {
    init(gpioPhysicalNo);
    let signalController = configure(switchOn(gpioPhysicalNo),switchOff(gpioPhysicalNo));
    let i = 0;
    const createSignal = function(){
        const impulsLength = MELODY[i++];
        const pauseLength = MELODY[i++];
        if(!impulsLength ||  !pauseLength) { return; }
        signalController(impulsLength,pauseLength,function(){
            createSignal();
        })
    };
    createSignal();
}
