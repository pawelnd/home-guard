const player = require("play-sound")();

export function alarm() {
  console.log(player);
  player.play("./sounds/submarine_alarm.wav", (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });
}