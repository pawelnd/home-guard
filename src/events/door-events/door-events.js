import {filter, publish, tap} from "rxjs/operators";
import {getEventStream} from "../events";
import {DOOR_ACTIONS} from "../event-type";
import {timer} from "rxjs";
import {switchMap,takeUntil} from "rxjs/operators";

export const createEvents = (events$) => {
    const disarm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_DISARM),
        tap(() => {console.log("DOOR DISARM RECEIVED")}),
        publish()
    );

    disarm$.connect();

    const  arm$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_ARM),
        tap(() => {console.log("DOOR ARM RECEIVED")}),
        publish()
    );

    arm$.connect();

    const  doorsOpen$ = events$.pipe(
        filter(type => type == DOOR_ACTIONS.DOOR_OPEN),
        tap(() => {console.log("DOOR OPEN RECEIVED")}),
        publish()
    );

    doorsOpen$.connect();

    arm$.pipe(
        switchMap(() => doorsOpen$.pipe(
            tap(() => {console.log("DOOR OPENED")}),
            takeUntil(disarm$),
            switchMap(() => timer(5000).pipe(
                tap(() => {console.log("DOOR WARN")}),
                takeUntil(disarm$),
                switchMap(() => timer(5000).pipe(
                    tap(() => {console.log("DOOR ALARM")}),
                    takeUntil(disarm$)
                ))
            ))
        ))
    ).subscribe();
}


