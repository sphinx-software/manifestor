const lodash = require('lodash');

class Manifestor {
    constructor(scanner, generator) {
        this.scanner        = scanner;
        this.generator      = generator;
        this.directories    = {};
    }


    register(directory, options = []) {
        this.directories[directory] = {directory: directory, options: options};
        return this;
    }

    async make() {
        let services    = [];
        let directories = lodash.values(this.directories);

        for(let index = 0; index < directories.length; index++) {
            let scannedServices = await this.scanner.scan(directories[index].directory, directories[index].options);

            services = services.concat(scannedServices);
        }

        await this.generator.generate(services);
    }
}

module.exports = Manifestor;
