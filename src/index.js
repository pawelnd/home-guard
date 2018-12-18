require('dotenv').config();

import {GPIO_CONFIG} from "./gpio.config";
import {firebaseApp} from "./firebase-init";
import {startHTTP} from "./notifications/http-server";
import {watchTempHumidity$} from "./sensors/temp-humidity/temp-humidity";
import {combineLatest} from "rxjs";
import {watchButton, watchDoorOpen, watchIsMotion$, watchIsWater$} from "./sensors/sensors";


const doorOpen$ = watchDoorOpen(GPIO_CONFIG.ACTION_BUTTON);
const buttonPressed$ = watchButton(GPIO_CONFIG.DOOR);
const motion$ = watchIsMotion$(GPIO_CONFIG.MOTION_SENSOR);
const water$ = watchIsWater$(GPIO_CONFIG.WATER_SENSOR);
const watchTempHum$ = watchTempHumidity$(GPIO_CONFIG.THERMOMETER);

var i = 0;
const combined = combineLatest(motion$, water$, watchTempHum$, buttonPressed$,doorOpen$);
combined.subscribe(([isMotion,isWater,tempHum, doorsAreOpen, buttonPushed])=>{
    let logLine = `${i++%10} door -> ${doorsAreOpen}`;//// button -> ${buttonPushed} motion -> ${isMotion}   water -> ${isWater} temp -> ${tempHum?tempHum.temp:'none'} hum -> ${tempHum?tempHum.humidity:'none'}`
    console.log(logLine)
})



// startHTTP().then(function (socket) {
//     console.log('user connected')
// });
