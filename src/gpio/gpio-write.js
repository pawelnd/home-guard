const gpio = require('rpi-gpio');

const initPin = (pin) => {
    return new Promise(function (resolve, reject) {
        try {
            gpio.setup(pin, gpio.DIR_OUT, () => {
                resolve(pin)
            });
        } catch (error) {
            reject(error);
        }
    });

}

const setHigh = (pin) => () => {
    setState(pin, true);
}
const setLow = (pin) => () => {
    setState(pin, false)
}
const setState = (pin, state) => {
    gpio.write(pin, state, () => {});
}

export function getPinOutputController(pin) {
    let pinInitialized = initPin(pin);
    return {
        setHigh: () => {
            pinInitialized.then(setHigh(pin))
        },
        setLow: () => {
            pinInitialized.then(setLow(pin))
        },
    }
}