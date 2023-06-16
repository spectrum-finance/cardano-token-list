const {version} = require('../package.json')
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;
const schema = require('../src/schema/tokenlist.cardano.schema.json');
const { expect } = require('chai');

const buildList = require('../src/buildList.js');
const parseCardanoTokenRegistry = require('../src/utils/parseCardanoTokenRegistry.js')

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv)

const validate = ajv.compile(schema);

const cardanoTokenList = buildList();
const cardanoRegistryList = parseCardanoTokenRegistry();

describe('buildList', () => {
    it('The list matches the schema', () => {
        const isValidList = validate(cardanoTokenList)
        if (!isValidList) {
            console.log(validate.errors);
        }
        expect(isValidList).to.equal(true);
    });

    it('The list contains no duplicate subjects', () => {
        const map = {};

        for (let token of cardanoTokenList.tokens) {
            const key = token.subject;
            expect(typeof map[key]).to.equal('undefined');
            map[key] = true;
        }
    })

    it('cardano-token-registry and cardano-token-list have equal length', () => {
        expect(cardanoRegistryList.length).to.equal(cardanoTokenList.tokens.length);
    })

    it('No tokens outside cardano-token-registry', () => {
        for (let registryToken of cardanoRegistryList) {
            expect(cardanoTokenList.tokens.some((token) => {
                return registryToken.subject === token.subject;
            })).to.be.true;
        }
    })

    it('Version matches package.json', () => {
        expect(version).to.match(/^\d+\.\d+\.\d+$/);
        expect(version).to.equal(`${cardanoTokenList.version.major}.${cardanoTokenList.version.minor}.${cardanoTokenList.version.patch}`);
    });
});
