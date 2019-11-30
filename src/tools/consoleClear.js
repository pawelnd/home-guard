var util = require('util');
var execSync = require('child_process').exec;

export function consoleClear(){
    execSync('clear', function(error, stdout, stderr){
        util.puts(stdout);
    });
}