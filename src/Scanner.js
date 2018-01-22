const recursive = require('recursive-readdir');
const path      = require('path');

class Scanner {

    async scan(directory, ignores = []) {
        ignores.push(file => {
            return !path.extname(file).match(/\.js$/);
        });

        return await recursive(directory, ignores);
    }
}

module.exports = Scanner;
