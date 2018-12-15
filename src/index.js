import {watchIsMotion$} from "./sensors/motion-sensor";

require('dotenv').config();

import {GPIO_CONFIG} from "./gpio.config";
import {firebaseApp} from "./firebase-init";
import {startHTTP} from "./notifications/http-server";
import {watchTempHumidity$} from "./sensors/temp-humidity/temp-humidity";
import {watchIsWater$} from "./sensors/water-sensor";
import {combineLatest} from "rxjs";


const motion$ = watchIsMotion$(GPIO_CONFIG.MOTION_SENSOR);
const water$ = watchIsWater$(GPIO_CONFIG.WATER_SENSOR);
const watchTempHum$ = watchTempHumidity$(GPIO_CONFIG.THERMOMETER);

const combined = combineLatest(motion$, water$, watchTempHum$);
combined.subscribe(([isMotion,isWater,tempHum])=>{
    let logLine = `motion -> ${isMotion}   water -> ${isWater} temp -> ${tempHum?tempHum.temp:'none'} hum -> ${tempHum?tempHum.humidity:'none'}`
    console.log(logLine)
})


// startHTTP().then(function (socket) {
//     console.log('user connected')
// });
