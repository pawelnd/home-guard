import {execSync} from "child_process";

const initPin = (gpioPhysicalNo) => {
    execSync(`gpio -1 mode ${gpioPhysicalNo} out`);
}

const setHigh = (gpioPhysicalNo) => () => {
    setCommand(gpioPhysicalNo,true);
}
const setLow = (gpioPhysicalNo) => () => {
    setCommand(gpioPhysicalNo,false);
}
const setCommand  = (pin,state) => {
    execSync(`gpio -1 write ${pin} ${state?1:0}`);
}
export function getPinOutputController(gpioPhysicalNo) {
    initPin(gpioPhysicalNo)
    return {
        setHigh: setHigh(gpioPhysicalNo),
        setLow: setLow(gpioPhysicalNo),
    }
}