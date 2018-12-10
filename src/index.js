import {GPIO_CONFIG} from "./gpio.config";

require('dotenv').config();
// import { startHTTP } from "./notifications/http-server";
// import { alarm } from "./notifications/alarm";
// import { getDistance } from "./sensors/distance-sensor";
import {watchIsWater} from "./sensors/water-sensor";
// import {firebaseApp} from '../firebase/init.js';
import {watchIsMotion } from "./sensors/motion-sensor";

//  watchIsMotion().subscribe((val)=> {console.log(` motion!! ${val}`)})
watchIsMotion(GPIO_CONFIG.MOTION_SENSOR).subscribe((val)=> {console.log(` motion ${val}`)})
// startHTTP().then(function(socket){
//     firebase.database().ref('/posts').on('child_added', function(postSnapshot) {
//         console.log(postSnapshot);
//       });

// });


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