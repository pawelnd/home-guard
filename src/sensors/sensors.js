import {gpioWatch} from "../gpio/gpio-read";
import {GPIO_MODE} from "../gpio/gpio-mode";

export function watchIsMotion$(gpioNo){
    return gpioWatch(gpioNo)
}

export function watchIsWater$(gpioNo){
    return gpioWatch(gpioNo)
}

export function watchDoorOpen(gpioNo){
    return gpioWatch(gpioNo)
}

export function watchButton(gpioNo){
    return gpioWatch(gpioNo)
}