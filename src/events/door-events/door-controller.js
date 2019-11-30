import { filter, pairwise } from 'rxjs/operators';
import { sendEvent } from '../events';
import { DoorEvents } from '../event-type';
import { initDoorEvents } from './door-events';

/**
 * It creates listener on sensors streams and execute proper events by {@link sendEvent}
 * @param doorOpen$
 * @param buttonPressed$
 */
export const createDoorController = (
  doorOpen$,
  buttonPressed$,
  events$,
) => {
  initDoorEvents(events$);

  doorOpen$.pipe(pairwise()).subscribe(([prev, current]) => {
    if (prev === false && current === true) {
      sendEvent(DoorEvents.DOOR_OPEN);
    }
    if (prev === true && current === false) {
      sendEvent(DoorEvents.DOOR_CLOSED);
    }
  });

  buttonPressed$
    .pipe(
      pairwise(),
      filter(([prev, current]) => prev === false && current === true),
    )
    .subscribe(() => {
      sendEvent(DoorEvents.DOOR_KEY_PRESSED);
    });
};
