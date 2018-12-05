import { startHTTP } from "./http-server";
import { getDistance } from "./distance-sensor";
import { alarm } from "./alarm";

startHTTP().then(function(socket){
    setInterval(updateDistance(socket),500);    
});

function updateDistance(socket){
    return function(){
        getDistance().then(function(distanceOutput){
            console.log(distanceOutput)
            socket.broadcast.emit('distance', distanceOutput);
            if(distanceOutput > 50){
                alarm();
            }
        });
    }
    
}