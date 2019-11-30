import { getBuzzerPlayer } from '../../notifications/buzzer/buzzer-player';
import { GPIO_CONFIG } from '../../gpio.config';
import { BUZZER_MELODIES } from '../../notifications/buzzer/buzzer-melodies';
import { logger } from '../../logger';

/**
 * Contains side effects for handling door events.
 * @type {{stop, start}}
 */
const buzzer = getBuzzerPlayer(GPIO_CONFIG.BUZZER);

export const onWarningSideEffects = () => {
  logger.debug('Buzzer warning');
  buzzer.stop();
  buzzer.start(BUZZER_MELODIES.MELODY_WARNING);
};
export const onAlarmSIdeEffect = () => {
  logger.debug('Buzzer alarming');
  buzzer.stop();
  buzzer.start(BUZZER_MELODIES.MELODY_ALARM);
};
export const onDisarmSideEffect = () => {
  logger.debug('Buzzer disarmed');
  buzzer.stop();
};

export const onNotificationSideEffect = () => {
  logger.debug('Buzzer arm confirmation');
  buzzer.stop();
  buzzer.start(BUZZER_MELODIES.MELODY_NOTIFY);
  setTimeout(() => buzzer.stop(), 200);
};
