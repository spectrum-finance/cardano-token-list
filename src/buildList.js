const {version} = require("../package.json");
const cardanoLocalList = require("./tokens.json");
const parseCardanoTokenRegistry = require('./utils/parseCardanoTokenRegistry.js')

function sortList(list) {
    return list.sort(function(t1, t2) {
        if (t1.ticker && t2.ticker) {
            return t1.ticker.toLowerCase() < t2.ticker.toLowerCase() ? -1 : 1
        }

        return true;
    });
}

function mergeBySubject(cardanoRegistryList, tokenList) {
    return cardanoRegistryList.map((token) => {
        return {
            ...token,
            ...tokenList[token.subject],
        };
    })
}

module.exports = async function buildTokenList() {
    const parsedVersion = version.split('.');

    const cardanoRegistryList = await parseCardanoTokenRegistry();
    console.log('cardano: ', cardanoRegistryList)

    return {
        name: 'Spectrum Finance Cardano Token List',
        timestamp: new Date().toISOString(),
        version: {
            major: +parsedVersion[0],
            minor: +parsedVersion[1],
            patch: +parsedVersion[2],
        },
        tags: {},
        keywords: ['spectrum finance', 'tokens', 'cardano tokens'],
        tokens: sortList(mergeBySubject(cardanoRegistryList, cardanoLocalList))
    };
}