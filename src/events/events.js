import {Subject} from "rxjs";
import {runDoorEvents} from "./door-events/door-events";

const actionStream = new Subject();

export const sendEvent = (type) => {
    actionStream.next(type);
}

const getEventStream = () => {
    return actionStream.asObservable();
}

const allEvents$ = getEventStream();

(function init() {
    runDoorEvents(allEvents$);
})()
