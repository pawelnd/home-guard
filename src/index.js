import {watchIsMotion$} from "./sensors/motion-sensor";

require('dotenv').config();

import {GPIO_CONFIG} from "./gpio.config";
import {firebaseApp} from "./firebase-init";
import {startHTTP} from "./notifications/http-server";
import {watchTempHumidity$} from "./sensors/temp-humidity/temp-humidity";
import {watchIsWater$} from "./sensors/water-sensor";
import {empty, of} from "rxjs";


const motion$ = watchIsMotion$(GPIO_CONFIG.MOTION_SENSOR);
const water$ = watchIsWater$(GPIO_CONFIG.WATER_SENSOR);
const watchTempHum$ = watchTempHumidity$(GPIO_CONFIG.THERMOMETER);

// motion$.subscribe(log('motion'));
// water$.subscribe(log('water'));
watchTempHum$.subscribe(log('temp,hum'))


function log(type){
    return (val) =>{
        if(val instanceof Object){
            for (let property in val) {
                if (val.hasOwnProperty(property)) {
                    console.log(`${property} is ${val[property]}`)
                }
            }
        }else{
            console.log(`${type} is ${val}`)
        }

    }
}
// startHTTP().then(function (socket) {
//     console.log('user connected')
// });
