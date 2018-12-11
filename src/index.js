require('dotenv').config();

import {GPIO_CONFIG} from "./gpio.config";
import {firebaseApp} from "./firebase-init";
import {startHTTP} from "./notifications/http-server";
import {watchIsMotion} from "./sensors/motion/motion-sensor";
import {watchIsWater} from "./sensors/water/water-sensor";
import {watchTempHumidity} from "./sensors/temp-humidity/temp-humidity";


watchIsMotion(GPIO_CONFIG.MOTION_SENSOR).subscribe((val) => {
    console.log(` motion!! ${val}`)
});
watchIsWater(GPIO_CONFIG.WATER_SENSOR).subscribe((val) => {
    console.log(` water ${val}`)
});
watchTempHumidity(GPIO_CONFIG.THERMOMETER).subscribe(({temp,humidity}) => {
    console.log(` temp = ${temp} and humidity = ${humidity}s`)
});
startHTTP().then(function (socket) {
    console.log('user connected')
});
// firebaseApp.database().ref();

// // watchIsWater().subscribe((val)=> {console.log(val)})
// function updateDistance(socket){
//     return function(){
//         getDistance().then(function(distanceOutput){
//             console.log(distanceOutput)
//             socket.broadcast.emit('distance', distanceOutput);
//             if(distanceOutput > 50){
//                 alarm();
//             }
//         });
//     }

// }



// const Gpio = require('onoff').Gpio;

// var pushButton = new Gpio(14, 'out'); //
// setInterval(function name(params) {
//     console.log(1);

//     pushButton.writeSync(1);
// },1000)

  