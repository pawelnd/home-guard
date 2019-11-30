import {execSync} from "child_process";

export function sendMail() {
    initPin(gpioPhysicalNo)
    return {
        setHigh: setHigh(gpioPhysicalNo),
        setLow: setLow(gpioPhysicalNo),
    }
}