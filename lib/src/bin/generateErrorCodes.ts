import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { validateErrorDefinitions } from '..';
import flattenErrorDefinition from '../flattenErrorDefinitions';
const args = process.argv.slice(2);

const packageJson = require(path.resolve(process.cwd(), 'package.json'));
const errorDefinition = packageJson.errorDefinitions;

if(!errorDefinition) {
    throw new Error('The application package.json must contain a "errorDefinitions" containing the relative path to the error definition file'
    );
}


const definitions = require(`../${packageJson.errorDefinitions}`);
//const definitionsList = Object.values(flattenErrorDefinition(definitions));

const def = definitions?.default? definitions.default : definitions;
const errorCodeMap = validateErrorDefinitions(def) // default because we are export default in errorDefintions.js
// console.log('Errpr Defintions', errorCodeMap)
const output = {
    name: packageJson.name,
    version: packageJson.version,
    definitions: Object.values(errorCodeMap),
};

const resultFile = path.resolve(process.cwd(), args[0]);
const resultDir = path.dirname(resultFile);

mkdirp.sync(resultDir);
fs.writeFileSync(resultFile, JSON.stringify(output, null, 2));

console.log('Error codes generated successfully!');