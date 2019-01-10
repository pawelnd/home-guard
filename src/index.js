require('dotenv').config();

import {combineLatest} from "rxjs";
import {watchButton, watchDoorsAreOpen, watchIsMotion$} from "./sensors/sensors";
import {getBuzzerPlayer} from "./notifications/buzzer/buzzer-player";
import {GPIO_CONFIG} from "./gpio.config";
import {BUZZER_MELODIES} from "./notifications/buzzer/buzzer-melodies";

let motion$ = watchIsMotion$();
let doorOpen$ = watchDoorsAreOpen();
let buttonPressed$ = watchButton();

var i = 0;
let buzzerPlayer = getBuzzerPlayer(GPIO_CONFIG.BUZZER);

const combined = combineLatest(motion$, buttonPressed$,doorOpen$);
combined.subscribe(([isMotion,buttonPushed, doorsAreOpen])=>{
    let logLine = `${i++%100} door -> ${doorsAreOpen} button -> ${buttonPushed} motion -> ${isMotion}`;
    console.log(logLine);
})

