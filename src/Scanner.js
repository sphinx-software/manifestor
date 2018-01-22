const recursive = require('recursive-readdir');
const path      = require('path');

class Scanner {

    async scan(directory, ignores = []) {
        ignores.push((file, stats) => {
            if (stats.isDirectory()) {
                return false;
            }
            return !path.extname(file).match(/\.js$/);
        });

        return await recursive(directory, ignores);
    }
}

module.exports = Scanner;
