import {DOOR_DISARM, DOOR_OPEN_ALARM, DOOR_OPEN_WARNING, DOOR_WAITING} from "./actions";

const initialState = {
    alarmArmed: true,
    alarmActive: false,
    warningActive: false
}

export const doors = (state = initialState, action) => {
    switch (action.type) {
        case DOOR_WAITING:
            return {
                ...state,
                alarmArmed: true,
                warningActive: false,
                alarmActive: false
            };
        case DOOR_OPEN_WARNING:
            return {
                ...state,
                warningActive: true,
                alarmActive: false

            };
        case DOOR_OPEN_ALARM:
            return {
                ...state,
                warningActive: false,
                alarmActive: true
            };
        case DOOR_DISARM:
            return {
                ...state,
                alarmArmed: false,
                warningActive: false,
                alarmActive: false
            };
        default:
            return state;
    }
};