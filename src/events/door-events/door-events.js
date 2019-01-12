import {DOOR_ACTIONS} from "../event-type";
import {publish, switchMap, takeUntil, tap, filter} from "rxjs/operators";
import {doAlarm, doDisarm, doWarn} from "./door-event-actions";
import {of, timer} from "rxjs";
import {logger} from "./../../logger";
import {sendEvent} from "../events";

const WARN_DELAY = 5000, ALARM_DELAY = 4000, ARMING_AGAIN_DELAY = 10000;

const bindHandlerToActions = (warnAction,alarmAction,disarmAction) => events$ => {
    logger.debug('Creating event handler for door');

    let doorEvents = events$.pipe(
        filter(type => Object.keys(DOOR_ACTIONS).indexOf(type) >= 0),
        tap((type) => logger.debug(`Event received: ${type}`)),
        publish()
    );
    doorEvents.connect();

    const disarm$ = doorEvents.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_DISARM),
    );

    const  arm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_ARM),
    );

    const  doorsOpen$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_OPEN),
    );

    const doorClosed$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_CLOSED),
    );

    /* rearming when door stays untouched */
    disarm$.pipe(
        tap(disarmAction),
        switchMap(() => timer(ARMING_AGAIN_DELAY).pipe(
            tap(() => {sendEvent(DOOR_ACTIONS.DOOR_ARM)}),
            takeUntil(doorsOpen$)
        ))
    ).subscribe();

    /* rearming action flow*/
    doorClosed$.pipe(
        switchMap(() => timer(ARMING_AGAIN_DELAY).pipe(
            tap(() => {sendEvent(DOOR_ACTIONS.DOOR_ARM)}),
            takeUntil(doorsOpen$),
        ))
    ).subscribe()

    /* arming action flow */
    arm$.pipe(
        tap(() => {logger.debug('Alarm has been armed waiting for door open')}),
        switchMap(() => doorsOpen$.pipe(
            tap(() => {logger.debug(`Door has been opened. Warning buzzer will be activated in ${WARN_DELAY/1000} sec`)}),
            takeUntil(disarm$),
            switchMap(() => timer(WARN_DELAY).pipe(
                tap(warnAction),
                takeUntil(disarm$),
                switchMap(() => timer(ALARM_DELAY).pipe(
                    tap(alarmAction),
                    takeUntil(disarm$)
                ))
            ))
        ))
    ).subscribe();

    sendEvent(DOOR_ACTIONS.DOOR_ARM);
}

export const initDoorEvents = bindHandlerToActions(doWarn,doAlarm,doDisarm);


