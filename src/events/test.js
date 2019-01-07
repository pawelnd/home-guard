import {sendEvent} from "./events";
import {DOOR_ACTIONS} from "./event-type";

setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},0);
setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},5000);
setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},6000);
setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_DISARM);},10000);


// setTimeout(() => { sendEvent(DOOR_ACTIONS.DOOR_OPEN);},5000);


let i = 0;
setInterval(() => {
    console.log(i++ + ' sec')
},1000);




