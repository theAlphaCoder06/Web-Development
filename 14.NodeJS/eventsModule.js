const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log("Event will occur after 3 seconds");
    setTimeout(function(){
        console.log("event occurred");
    }, 3000);
});

myEmitter.emit('event');
// setTimeout(function(){
    console.log("Code is running");
// }, 3000);