var assert = require('assert');

assert.throws(
    function() {
        throw new Error("Wrong value");
    },
    function(err) {
        if ( (err instanceof Error)) {
            return true;
        }
    },
    "unexpected error"
);


console.log('Everything is okay!');