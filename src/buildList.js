const {version} = require("../package.json");
const ergo = require("./tokens/ergo.json");
const cardano = require("./tokens/cardano.json");
const fs = require("fs");
const path = require("path");

function parseCardanoTokenRegistry() {
    let list = [];

    fs.readdirSync(path.join(__dirname, "../cardano-token-registry/mappings")).forEach((fileName, index) => {
        const file = fs.readFileSync(path.join(__dirname, `../cardano-token-registry/mappings/${fileName}`));
        const json = JSON.parse(file.toString())

        let policyId = '';
        const token = {};

        if (json.subject) {
            const pid = json.subject.slice(0, 56);
            token.policyId = pid;
            token.subject = json.subject;
            policyId = pid;
        } else {
            return;
        }

        if (json.name && json.name.value) token.name = json.name.value;
        if (json.description && json.description.value) token.description = json.description.value;
        if (json.ticker && json.ticker.value) token.ticker = json.ticker.value;
        if (json.decimals && json.decimals.value) token.decimals = json.decimals.value;

        list.push(token);
    })

    return list;
}

function sortList(list) {
    return list.sort(function(t1, t2) {
        if (t1.ticker && t2.ticker) {
            return t1.ticker.toLowerCase() < t2.ticker.toLowerCase() ? -1 : 1
        }

        return true;
    });
}

function mergeByPolicyId(cardanoRegistryList, tokenList) {
    return cardanoRegistryList.map((token) => {
        return {
            ...token,
            ...tokenList[token.policyId],
        };
    })
}

function makeErgoList(list) {
    return Object.keys(list).map((key) => {
        return {
            address: key,
            ...list[key]
        }
    })
}

module.exports = function buildTokenList() {
    const parsedVersion = version.split('.');

    const cardanoRegistryList = parseCardanoTokenRegistry()

    return {
        name: 'Spectrum Finance Token List',
        timestamp: new Date().toISOString(),
        version: {
            major: +parsedVersion[0],
            minor: +parsedVersion[1],
            patch: +parsedVersion[2],
        },
        tags: {},
        keywords: ['spectrum finance', 'tokens', 'default'],
        tokens: {
            ergo: sortList(makeErgoList(ergo)),
            cardano: sortList(mergeByPolicyId(cardanoRegistryList, cardano)),
        }
    };
}