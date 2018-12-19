import {getBuzzerPlayer} from "./notifications/buzzer/buzzer-player";

require('dotenv').config();

import {GPIO_CONFIG} from "./gpio.config";
import {firebaseApp} from "./firebase-init";
import {startHTTP} from "./notifications/http-server";
import {watchTempHumidity$} from "./sensors/temp-humidity/temp-humidity";
import {combineLatest} from "rxjs";
import {watchButton, watchDoorOpen, watchIsMotion$, watchIsWater$} from "./sensors/sensors";
import {distinctUntilChanged} from "rxjs/operators";
import {BUZZER_MELODIES} from "./notifications/buzzer/buzzer-melodies";
import {getPinOutputController} from "./gpio/gpio-write";



const doorOpen$ = watchDoorOpen(GPIO_CONFIG.ACTION_BUTTON);
const buttonPressed$ = watchButton(GPIO_CONFIG.DOOR);
const motion$ = watchIsMotion$(GPIO_CONFIG.MOTION_SENSOR);
const water$ = watchIsWater$(GPIO_CONFIG.WATER_SENSOR);
const watchTempHum$ = watchTempHumidity$(GPIO_CONFIG.THERMOMETER);

var i = 0;
// const combined = combineLatest(motion$, water$, watchTempHum$, buttonPressed$,doorOpen$);
// combined.subscribe(([isMotion,isWater,tempHum, doorsAreOpen, buttonPushed])=>{
//     let logLine = `${i++%100} door -> ${doorsAreOpen} button -> ${buttonPushed} motion -> ${isMotion}   water -> ${isWater} temp -> ${tempHum?tempHum.temp:'none'} hum -> ${tempHum?tempHum.humidity:'none'}`
//     console.log(logLine)
// })

let relayController = getPinOutputController(GPIO_CONFIG.RELAY);

motion$.pipe(distinctUntilChanged()).subscribe((open)=>{
    console.log(open)
    if(!open){
        relayController.setLow();
    }else {
        relayController.setHigh();
    }

})

// startHTTP().then(function (socket) {
//     console.log('user connected')
// });
