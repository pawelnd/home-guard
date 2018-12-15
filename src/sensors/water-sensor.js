import {gpioWatch} from "./gpio-read/gpio";
import {GPIO_CONFIG} from "../gpio.config";

export function watchIsWater$(){
    return gpioWatch(GPIO_CONFIG.WATER_SENSOR)
}