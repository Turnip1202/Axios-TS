"use strict";
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        if (this.greeting) {
            return 'Hello, ' + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}
Greeter.standardGreeting = 'Hello, there';
let greeter;
greeter = new Greeter();
console.log(greeter.greet());
let greeterMaker = Greeter;
greeterMaker.standardGreeting = 'Hey there';
let greeter2 = new greeterMaker();
console.log(greeter2.greet());
