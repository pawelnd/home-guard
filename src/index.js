import {filter, pairwise} from "rxjs/operators";

require('dotenv').config();

import {combineLatest} from "rxjs";
import {watchButton, watchDoorsAreOpen, watchIsMotion$} from "./sensors/sensors";
import {initEvents, sendEvent} from "./events/events";
import {DOOR_ACTIONS} from "./events/event-type";
import {logger} from "./logger";

let motion$ = watchIsMotion$();
let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();

doorOpen$.pipe(
    pairwise(),
    filter(([prev,current]) => prev === false && current === true)
).subscribe(() => {
    sendEvent(DOOR_ACTIONS.DOOR_OPEN);
});

buttonPressed$.pipe(
    pairwise(),
    filter(([prev,current]) => prev === false && current === true)
).subscribe(() => {
    sendEvent(DOOR_ACTIONS.DOOR_DISARM)
});


combineLatest(motion$, buttonPressed$, doorOpen$)
    .subscribe(([ buttonPushed, doorsAreOpen]) => {
        let logLine = `Inputs changed: door -> ${doorsAreOpen} button -> ${buttonPushed}`;
        logger.debug(logLine);
    });

initEvents();

