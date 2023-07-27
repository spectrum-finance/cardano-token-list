const {version} = require('../package.json')
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;
const schema = require('../src/schema/tokenlist.cardano.schema.json');
const { expect } = require('chai');

const buildList = require('../src/buildList.js');

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv)

const validate = ajv.compile(schema);

describe('buildList', () => {
    it('The list matches the schema', async () => {
        const cardanoTokenList = await buildList();
        const isValidList = validate(cardanoTokenList)
        if (!isValidList) {
            console.log(validate.errors);
        }
        expect(isValidList).to.equal(true);
    });

    it('The list contains no duplicate subjects', async () => {
        const cardanoTokenList = await buildList();

        const map = {};

        for (let token of cardanoTokenList.tokens) {
            const key = token.subject;
            expect(typeof map[key]).to.equal('undefined');
            map[key] = true;
        }
    })

    it('Version matches package.json', async () => {
        const cardanoTokenList = await buildList();
        expect(version).to.match(/^\d+\.\d+\.\d+$/);
        expect(version).to.equal(`${cardanoTokenList.version.major}.${cardanoTokenList.version.minor}.${cardanoTokenList.version.patch}`);
    });
});
