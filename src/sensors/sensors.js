import {gpioWatch} from "./gpio-read/gpio";
import {GPIO_CONFIG} from "../gpio.config";
import {GPIO_MODE} from "./gpio-read/gpio-mode";

export function watchIsMotion$(gpioNo){
    return gpioWatch(GPIO_CONFIG.MOTION_SENSOR)
}

export function watchIsWater$(gpioNo){
    return gpioWatch(GPIO_CONFIG.WATER_SENSOR)
}


export function watchDoorOpen(gpioNo){
    return gpioWatch(gpioNo, GPIO_MODE.UP)
}

export function watchButton(gpioNo){
    return gpioWatch(gpioNo, GPIO_MODE.UP)
}