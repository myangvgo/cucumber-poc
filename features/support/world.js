const { setWorldConstructor } = require('cucumber');

class CustomWorld {
    constructor() {
        this.getTodo = {};
        this.postPayload = {};
    }
}

setWorldConstructor(CustomWorld);
