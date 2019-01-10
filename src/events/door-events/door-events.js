import {DOOR_ACTIONS} from "../event-type";
import {publish, switchMap, takeUntil, tap, filter} from "rxjs/operators";
import {doAlarm, doDisarm, doWarn} from "./door-event-actions";


const WARN_DELAY = 5000, ALARM_DELAY = 4000;

const bindHandlerToActions = (warnAction,alarmAction,disarmAction) => events$ => {
    const disarm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_DISARM),
        tap(() => {console.log("DOOR DISARM RECEIVED")}),
        publish()
    );

    const  arm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_ARM),
        tap(() => {console.log("DOOR ARM RECEIVED")}),
        publish()
    );

    const  doorsOpen$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_OPEN),
        tap(() => {console.log("DOOR OPEN RECEIVED")}),
        publish()
    );

    disarm$.pipe(
        tap(disarmAction)
    ).subscribe();

    arm$.pipe(
        switchMap(() => doorsOpen$.pipe(
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

    [disarm$,arm$,doorsOpen$].forEach((el) => {el.connect()})
}

export const runDoorEvents = bindHandlerToActions(doWarn,doAlarm,doDisarm);


