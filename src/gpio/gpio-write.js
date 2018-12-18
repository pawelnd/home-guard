import {execSync} from "child_process";
const initPin = (gpioPhysicalNo) => {
    execSync(`gpio -1 mode ${gpioPhysicalNo} out`);
}

const setHigh = (gpioPhysicalNo) => () => {
    execSync(`gpio -1 write ${gpioPhysicalNo} 1`);
}
const setLow = (gpioPhysicalNo) => () => {
    execSync(`gpio -1 write ${gpioPhysicalNo} 1`);
}
export function getRelayController(gpioPhysicalNo) {
    initPin(gpioPhysicalNo)
    return {
        setHigh: setHigh(gpioPhysicalNo),
        setLow: setLow(gpioPhysicalNo),
    }
}