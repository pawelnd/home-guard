import { startHTTP } from "./http-server";
import { getDistance } from "./distance-sensor";

startHTTP().then(function(socket){
    setInterval(updateDistance(socket),2000);    
});

function updateDistance(socket){
    return () => {
      getDistance().then(function(distance){
        socket.emit('distance', distance);
      });
    };
    
}