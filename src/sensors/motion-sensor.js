import {gpioWatch} from "./gpio-read/gpio";
import {GPIO_CONFIG} from "../gpio.config";

export function watchIsMotion$(){
    return gpioWatch(GPIO_CONFIG.MOTION_SENSOR)
}