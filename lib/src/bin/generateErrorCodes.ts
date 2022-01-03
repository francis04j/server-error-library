import path from 'path';
import { validateErrorDefinitions } from '..';
import flattenErrorDefinition from '../flattenErrorDefinitions';
const args = process.argv.slice(2);

const packageJson = require(path.resolve(process.cwd(), 'package.json'));
const errorDefinition = packageJson.errorDefinitions;

if(!errorDefinition) {
    throw new Error('The application package.json must contain a "errorDefinitions" containing the relative path to the error definition file'
    );
}

const definitions = require(`${packageJson.name}/${packageJson.errorDefinitions}`);
const definitionsList = Object.values(flattenErrorDefinition(definitions));

const errorCodeMap = validateErrorDefinitions(definitions)

const output = {
    name: packageJson.name,
    version: packageJson.version,
    definitions: Object.values(errorCodeMap),
};
