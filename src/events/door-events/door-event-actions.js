import {getBuzzerPlayer} from "../../notifications/buzzer/buzzer-player";
import {GPIO_CONFIG} from "../../gpio.config";
import {BUZZER_MELODIES} from "../../notifications/buzzer/buzzer-melodies";

const buzzer = getBuzzerPlayer(GPIO_CONFIG.BUZZER);

export const doWarn = () => {
    buzzer.stop();
    buzzer.start(BUZZER_MELODIES.MELODY_WARNING);
};
export const doAlarm = () => {
    buzzer.stop();
    buzzer.start(BUZZER_MELODIES.MELODY_ALARM);
};
export const doDisarm = () => {
    buzzer.stop();
};