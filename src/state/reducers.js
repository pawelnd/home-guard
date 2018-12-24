import {DOOR_DISARM, DOOR_WAITING} from "./actions";

const initialState = {
    armed: true
}

export const doors = (state = initialState, action) => {
    switch (action.type) {
        case DOOR_WAITING:
            return {
                ...state,
                armed: true
            };
        case DOOR_DISARM:
            return {
                ...state,
                armed: false
            };
        default:
            return state;
    }
};