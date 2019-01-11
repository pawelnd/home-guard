import {DOOR_ACTIONS} from "../event-type";
import {publish, switchMap, takeUntil, tap, filter} from "rxjs/operators";
import {doAlarm, doDisarm, doWarn} from "./door-event-actions";
import {of, timer} from "rxjs";
import {logger} from "./../../logger";
import {sendEvent} from "../events";

const WARN_DELAY = 5000, ALARM_DELAY = 4000;

const bindHandlerToActions = (warnAction,alarmAction,disarmAction) => events$ => {
    logger.debug('Creating event handler for door');

    const disarm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_DISARM),
        tap(() => {logger.debug("Event received: DOOR DISARM RECEIVED")}),
        publish()
    );

    const  arm$ = of(1)
        /*events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_ARM),
        tap(() => {logger.debug("Event received: DOOR ARM RECEIVED")}),
        publish()
    );*/

    const  doorsOpen$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_OPEN),
        tap(() => {logger.debug("Event received: DOOR OPEN RECEIVED")}),
        publish()
    );
    disarm$.connect();
    arm$.connect();
    doorsOpen$.connect();

    disarm$.pipe(
        tap(() => {logger.debug(11)}),
        tap(disarmAction)
    ).subscribe();

    arm$.pipe(
        tap(() => {logger.debug(1)}),
        switchMap(() => doorsOpen$.pipe(
            tap(() => {logger.debug(2)}),
            takeUntil(disarm$),
            switchMap(() => timer(WARN_DELAY).pipe(
                tap(() => {logger.debug(3)}),
                tap(warnAction),
                takeUntil(disarm$),
                switchMap(() => timer(ALARM_DELAY).pipe(
                    tap(() => {logger.debug(4)}),
                    tap(alarmAction),
                    takeUntil(disarm$)
                ))
            ))
        ))
    ).subscribe();
}

export const initDoorEvents = () => {
    bindHandlerToActions(doWarn,doAlarm,doDisarm);
    sendEvent(DOOR_ACTIONS.DOOR_ARM);
    sendEvent(DOOR_ACTIONS.DOOR_OPEN);
};


