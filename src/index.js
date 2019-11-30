import { filter, pairwise } from 'rxjs/operators';

require('dotenv').config();

import { watchButton, watchDoorsAreOpen } from './sensors/sensors';
import { getEventStream, sendEvent } from './events/events';
import { DoorEvents } from './events/event-type';
import { createDoorController } from './events/door-events/door-controller';

console.log('HELLO');
let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();
let events$ = getEventStream();

// doorOpen$.subscribe();
let i = 0;
setInterval(() => {
  console.log(i++);
}, 1000);
buttonPressed$.subscribe(isPressed =>
  console.log('isPressed', isPressed),
);
// doorOpen$.subscribe(doorOpen => console.log('doorOpen', doorOpen));

createDoorController(doorOpen$, buttonPressed$, events$);

// ++++++++++++++++++++++++++++++++++++++
// gpio.setup(7, gpio.DIR_IN, readInput);

// function readInput(err) {
//   if (err) throw err;
//   gpio.read(7, function(err, value) {
//     if (err) throw err;
//     console.log('The value is ' + value);
//   });
// }
