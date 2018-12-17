/**
 * Each 2n index indicates how long signal should last in buzzer and
 * 2n+1 index indicate how long is pause
 * @type {{MELODY_ALARM: number[], MELODY_WARNING: number[], RANDOMIZED: number[]}}
 */
export const BUZZER_MELODIES = {
    MELODY_ALARM : [600,100,600,100,600,100],
    MELODY_WARNING : [10,1000,10,100,10,1000,10,100],
    /* for fun purposes only :)*/
    RANDOMIZED : Array.from({length: 40}, () => Math.floor(Math.random() * 500))
}