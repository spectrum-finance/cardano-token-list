const fs = require("fs");
const path = require("path");

const NAME_PATTERN = /\$?[ \w.'+\-%\/À-ÖØ-öø-ÿ:&\[\]\(\)]+$/gy
const TICKER_PATTERN = /^[a-zA-Z0-9+\-%/$.]+$/gy

module.exports = function parseCardanoTokenRegistry() {
    let list = [];

    fs.readdirSync(path.join(__dirname, "../../node_modules/cardano-token-registry/mappings")).forEach((fileName, index) => {
        const file = fs.readFileSync(path.join(__dirname, `../../node_modules/cardano-token-registry/mappings/${fileName}`));
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

        if (json.name && json.name.value && json.name.value.length <= 40 && NAME_PATTERN.test(json.name.value)
            && json.ticker && json.ticker.value && TICKER_PATTERN.test(json.ticker.value)
            && json.decimals && json.decimals.value !== undefined
        ) {

            if (json.description && json.description.value) {
                if (json.description.value.length > 300) {
                    token.description = json.description.value.slice(0, 300).trim();
                } else {
                    token.description = json.description.value.trim();
                }
            }

            token.name = json.name.value.trim();
            token.ticker = json.ticker.value.trim();
            token.decimals = json.decimals.value;

            list.push(token);
        }

    })

    return list;
}