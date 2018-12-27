import {ofType} from "redux-observable";
import {filter, map, switchMap, takeUntil} from "rxjs/operators";
import {timer} from "rxjs";
import {
    DOOR_DISARM,
    doorAlarmSetWaiting, DOOR_WAITING, DOOR_OPEN, doorAlarmSetWarning, doorAlarmSetAlarm
} from "./actions";

const doorDisarmTime = 10000;
const alarmDelay = 4000;

const doorDisarmEpic = action$ => {
    const armCountDown = timer(doorDisarmTime).pipe(
        takeUntil(action$.pipe(
            ofType(DOOR_DISARM,DOOR_WAITING)
        )),
        map(() => doorAlarmSetWaiting())
    );

    return action$.pipe(
        ofType(DOOR_DISARM),
        switchMap(() => armCountDown),
    );
}

const doorOpenEpic = action$ => {
    const skipOnDisarm = takeUntil(action$.pipe(
        filter(action => action.type === DOOR_DISARM)
    ));

    const startWarning = timer(alarmDelay).pipe(skipOnDisarm, map(() => doorAlarmSetWarning()));
    const startAlarm = timer(alarmDelay).pipe(skipOnDisarm, map(() => doorAlarmSetAlarm()));

    return action$.pipe(
        ofType(DOOR_OPEN),
        switchMap(() => startWarning),
        switchMap(() => startAlarm)
    );
}

export const doorEpics = [doorDisarmEpic, doorOpenEpic];