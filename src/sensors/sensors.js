import { map } from 'rxjs/operators';
import {gpioWatch} from "../gpio/gpio-read";
import {GPIO_MODE} from "../gpio/gpio-mode";
import {GPIO_CONFIG} from "../gpio.config";

export function watchIsMotion$(){
    return gpioWatch(GPIO_CONFIG.MOTION_SENSOR)
}

export function watchIsWater$(){
    return gpioWatch(GPIO_CONFIG.WATER_SENSOR)
}

export function watchDoorsAreOpen(){
    return gpioWatch(GPIO_CONFIG.DOOR).pipe(
        map( (out) => !out)
    );
}

export function watchButton(){
    return gpioWatch(GPIO_CONFIG.ACTION_BUTTON)
}