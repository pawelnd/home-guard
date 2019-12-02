import { map, tap } from 'rxjs/operators';
import { gpioWatch } from '../gpio/gpio-read';
import { GPIO_CONFIG } from '../gpio.config';

export function watchIsMotion$() {
  return gpioWatch(GPIO_CONFIG.MOTION_SENSOR);
}

export function watchIsWater$() {
  return gpioWatch(GPIO_CONFIG.WATER_SENSOR);
}

export function watchDoorsAreOpen() {
  return gpioWatch(GPIO_CONFIG.DOOR).pipe(
    map(out => !out),
    tap(areDoorsOpen => console.log('DOORS OPEN:', areDoorsOpen)),
  );
}

export function watchButton() {
  return gpioWatch(GPIO_CONFIG.ACTION_BUTTON);
}
