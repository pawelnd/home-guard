import {ofType} from "redux-observable";
import {filter, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {timer} from "rxjs";
import {
    DOOR_DISARM, doorAlarmSetWaiting, DOOR_WAITING, DOOR_OPEN, doorAlarmSetWarning, doorAlarmSetAlarm, DOOR_OPEN_WARNING
} from "./actions";

const doorDisarmTime = 10000;
const alarmDelay = 6000;

const skipOnDisarm = (action$) => takeUntil(action$.pipe(
    filter(action => action.type === DOOR_DISARM)
));


const armAfterDisarm = action$ => {
    const armCountDown = timer(doorDisarmTime).pipe(
        takeUntil(action$.pipe(
            ofType(DOOR_DISARM, DOOR_WAITING)
        )),
        map(() => doorAlarmSetWaiting())
    );

    return action$.pipe(
        ofType(DOOR_DISARM),
        switchMap(() => armCountDown),
    );
}


const doorOpenWarning = action$ => {


    return action$.pipe(
        ofType(DOOR_OPEN),
        switchMap(() => timer(alarmDelay).pipe(
            skipOnDisarm(action$),
            map(() => doorAlarmSetWarning())
        ))
    );
}

const doorOpenAlarm = action$ => {

    return action$.pipe(
        ofType(DOOR_OPEN_WARNING),
        switchMap(() => timer(alarmDelay).pipe(
            skipOnDisarm(action$),
            map(() => doorAlarmSetAlarm())
        ))
    );
}

export const doorEpics = [armAfterDisarm, doorOpenWarning, doorOpenAlarm];