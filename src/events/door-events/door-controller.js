import { interval, Subject, timer, pipe, zip } from 'rxjs';
import { switchMap, tap, filter, subscribeOn } from 'rxjs/operators';
import { States } from './door-states';

/**
 * It creates listener on sensors streams and execute proper events by {@link sendEvent}
 * @param doorOpen$
 * @param buttonPressed$
 */
export const createDoorController = (doorOpen$, buttonPressed$) => {
  const disarmed = zip(doorOpen$, buttonPressed$).pipe(
    tap('STATUS: disarmed'),
    filter((open, pressed) => open === false && pressed === false),
    // tap('ALARM ARMED'),
  );

  timer(1000)
    .pipe(
      tap(() => console.log('STARTING EVENT HANDLERS')),
      switchMap(() => disarmed),
    )
    .subscribe();
};
