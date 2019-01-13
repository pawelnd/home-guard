import {filter, pairwise} from "rxjs/operators";

require('dotenv').config();

import {watchButton, watchDoorsAreOpen} from "./sensors/sensors";
import {getEventStream, sendEvent} from "./events/events";
import {DOOR_ACTIONS} from "./events/event-type";
import {createDoorController} from "./events/door-events/door-controller";

let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();
let events$ = getEventStream();

createDoorController(doorOpen$, buttonPressed$, events$);
