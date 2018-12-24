export const DOOR_WAITING = 'DOOR_WAITING';
export const DOOR_OPEN = 'DOOR_OPEN';
export const DOOR_OPEN_WARNING = 'DOOR_OPEN_WARNING';
export const DOOR_OPEN_ALARM = 'DOOR_OPEN_ALARM';
export const DOOR_DISARM = 'DOOR_DISARM';

export const doorOpen = () => ({type: DOOR_OPEN});
export const doorAlarmSetWarning = () => ({type: DOOR_OPEN_WARNING});
export const doorAlarmSetAlarm = () => ({type: DOOR_OPEN_ALARM});
export const doorAlarmSetDisarm = () => ({type: DOOR_DISARM});
export const doorAlarmSetWaiting = () => ({type: DOOR_WAITING});
