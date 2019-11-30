import { DoorEvents } from '../event-type';
import {
  publish,
  switchMap,
  takeUntil,
  tap,
  filter,
} from 'rxjs/operators';
import {
  onAlarmSIdeEffect,
  onNotificationSideEffect,
  onDisarmSideEffect,
  onWarningSideEffects,
} from './door-event-actions';
import { of, timer } from 'rxjs';
import { logger } from './../../logger';
import { sendEvent } from '../events';
import { States } from './door-sates';

/**
 * Creates event subscriptions on door events and execute side effects
 * @type {number}
 */
const WARN_DELAY = 5000,
  ALARM_DELAY = 4000,
  ARMING_AGAIN_DELAY = 10000;

const currentState = States.DISARMED;
const stateChangeTime = Date.now().getTime();

const bindHandlerToActions = (
  notifyAction,
  warnAction,
  alarmAction,
) => events$ => {
  logger.debug('Creating event handler for door');
  events$.subscribe(event => {
    if (currentState == States.DISARMED)
      switch (currentState) {
      }
  });
};

export const initDoorEvents = bindHandlerToActions(
  onNotificationSideEffect,
  onWarningSideEffects,
  onAlarmSIdeEffect,
);
