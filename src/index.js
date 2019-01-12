import {filter, pairwise} from "rxjs/operators";

require('dotenv').config();

import {watchButton, watchDoorsAreOpen} from "./sensors/sensors";
import {initEvents, sendEvent} from "./events/events";
import {DOOR_ACTIONS} from "./events/event-type";

let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();

doorOpen$.pipe(
    pairwise(),
).subscribe(([prev,current]) => {
    if(prev === false && current === true){
        sendEvent(DOOR_ACTIONS.DOOR_OPEN);
    }
    if(prev === true && current === false){
        sendEvent(DOOR_ACTIONS.DOOR_CLOSED);
    }
});

buttonPressed$.pipe(
    pairwise(),
    filter(([prev,current]) => prev === false && current === true)
).subscribe(() => {
    sendEvent(DOOR_ACTIONS.DOOR_DISARM)
});


initEvents();

