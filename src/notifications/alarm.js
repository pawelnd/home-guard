const player = require("play-sound")();

export function alarm() {
  console.log("alarm executed");
  player.play("./sounds/submarine_alarm.wav", (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });  
}  