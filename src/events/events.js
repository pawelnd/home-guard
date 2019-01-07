import {Subject} from "rxjs";
import {createEvents, disarm$} from "./door-events/door-events";

const actionStream = new Subject();

export const sendEvent = (type) => {
    actionStream.next(type);
}

export const getEventStream = () => {
    return actionStream.asObservable();
}


(function doRegister() {
    createEvents(getEventStream());
    }
)()
