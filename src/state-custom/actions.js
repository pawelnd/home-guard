import {Subject, timer} from "rxjs";
import {
    filter,
    finalize,
    switchMap,
    takeUntil,
    tap,
    delay,
    share,
    publish,
    skipUntil,
    takeWhile,
    flatMap
} from "rxjs/operators";

export const DOOR_ACTIONS = {
    DOOR_ARM:'DOOR_ARM',
    DOOR_DISARM:'DOOR_DISARM',
    DOOR_OPEN:'DOOR_OPEN',
}

const actionStream = new Subject();

export const sendEvent  = (type) => {
    actionStream.next(type);
}

export const getEventStream = () => {
    return actionStream.asObservable();
}

let events$ = getEventStream();

let disarm$ = events$.pipe(
    filter(type => type == DOOR_ACTIONS.DOOR_DISARM),
    tap(() => {console.log("DOOR DISARM RECEIVED")}),
    publish()
);

let arm$ = events$.pipe(
    filter(type => type == DOOR_ACTIONS.DOOR_ARM),
    tap(() => {console.log("DOOR ARM RECEIVED")}),
    publish()
);

let doorsOpen$ = events$.pipe(
    filter(type => type == DOOR_ACTIONS.DOOR_OPEN),
    tap(() => {console.log("DOOR OPEN RECEIVED")}),
    publish()
);
disarm$.connect();
arm$.connect();
doorsOpen$.connect();

//arm after disarm
disarm$.pipe(
    switchMap(() => timer(2000).pipe(
        tap(() => sendEvent(DOOR_ACTIONS.DOOR_ARM))
    ))
).subscribe();



//alarm when door open
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



setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},0);

setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_OPEN);},3000);
setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},10000);

// setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_OPEN);},5000);




let i = 0;
setInterval(() => {
    console.log(i++ + ' sec')
},1000);









