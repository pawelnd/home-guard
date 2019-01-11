import {Subject} from "rxjs";
import {initDoorEvents} from "./door-events/door-events";
import {logger} from "../logger";

const actionStream = new Subject();

export const sendEvent = (type) => {
    logger.debug(`Sending event ${type}`)
    actionStream.next(type);
}

const getEventStream = () => {
    return actionStream.asObservable();
}

const allEvents$ = getEventStream();

export const initEvents = () => {
    logger.debug('Initializing events');
    initDoorEvents(allEvents$);
}
