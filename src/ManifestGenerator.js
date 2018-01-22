const fs        = require('fs');
const path      = require('path');
const writeFile = require('util').promisify(fs.writeFile);

class ManifestGenerator {

    setOutput(output) {
        this.output = output;
        return this;
    }

    async generate(services) {
        let content = services.map(file => {
            return `    "${path.parse(file).name}": require("${process.cwd() + '/' + file}")`
        }).join(",\n");

        await writeFile(this.output, `//Generated By Manifestor ${new Date().toISOString()}\n` + `module.exports = {\n${content}\n};`);
    }
}

module.exports = ManifestGenerator;
