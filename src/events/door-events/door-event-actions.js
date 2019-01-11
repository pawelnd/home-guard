import {getBuzzerPlayer} from "../../notifications/buzzer/buzzer-player";
import {GPIO_CONFIG} from "../../gpio.config";
import {BUZZER_MELODIES} from "../../notifications/buzzer/buzzer-melodies";
import {logger} from "../../logger";

const buzzer = getBuzzerPlayer(GPIO_CONFIG.BUZZER);

export const doWarn = () => {
    logger.debug('Buzzer warning');
    buzzer.stop();
    buzzer.start(BUZZER_MELODIES.MELODY_WARNING);
};
export const doAlarm = () => {
    logger.debug('Buzzer alarming');
    buzzer.stop();
    buzzer.start(BUZZER_MELODIES.MELODY_ALARM);
};
export const doDisarm = () => {
    logger.debug('Buzzer disarmed');
    buzzer.stop();
};