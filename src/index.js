import { watchButton, watchDoorsAreOpen } from './sensors/sensors';
import { getEventStream, sendEvent } from './events/events';
import { createDoorController } from './events/door-events/door-controller';
require('dotenv').config();

console.log('HELLO');
let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();
let events$ = getEventStream();

let i = 0;
setInterval(() => {
  console.log(i++);
}, 1000);

createDoorController(doorOpen$, buttonPressed$, events$);
