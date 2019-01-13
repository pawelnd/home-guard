import {Subject} from "rxjs";
import {logger} from "../logger";

const actionStream = new Subject();

export const sendEvent = (type) => {
    logger.debug(`Sending event ${type}`)
    actionStream.next(type);
}

export const getEventStream = () => {
    return actionStream.asObservable();
}

