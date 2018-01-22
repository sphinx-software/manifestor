const chalk   = require('chalk');
const lodash  = require('lodash');

const Manifestor           = require('../src/Manifestor');
const Scanner              = require('../src/Scanner');
const ManifestGenerator    = require('../src/ManifestGenerator');

let program = require('commander');
let cwd     = process.cwd();

let packageJson = {};

try {
    packageJson = require(cwd + '/package.json');
} catch (e) {
    console.warn(chalk.yellow('No package.json file found. Please make sure that you are running on the project root!'));
    process.exit(1);
}
program
    .version('0.0.1')
    .parse(process.argv);


let manifestorConfig = packageJson['manifestor'];

if (!manifestorConfig || !lodash.isArray(manifestorConfig)) {
    console.warn(chalk.yellow('Invalid manifestor config. Please check the README.md for more information'));
    process.exit(1);
}

let output = cwd + '/manifest.js';

let manifestor = new Manifestor(new Scanner(), new ManifestGenerator().setOutput(output));

manifestorConfig.forEach(config => manifestor.register(config.directory, config.options || []));
manifestor.make().then(() => {
    console.info(chalk.gray(`Generated manifest file at ${chalk.green(output)}`));
    process.exit(0);
}).catch(error => {
    console.error(chalk.red('Error while generating the manifest file'));
    console.error(error);
    process.exit(2);
});
