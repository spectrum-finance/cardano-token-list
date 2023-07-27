const fs = require("fs");
const path = require("path");

module.exports = function parseCardanoTokenRegistry() {
    let list = [];

    fs.readdirSync(path.join(__dirname, "../../cardano-token-registry/mappings")).forEach((fileName) => {
        const file = fs.readFileSync(path.join(__dirname, `../../cardano-token-registry/mappings/${fileName}`));
        const json = JSON.parse(file.toString())

        const token = {};

        if (json.subject) {
            token.policyId = json.subject.slice(0, 56);
            token.subject = json.subject;
        } else {
            return;
        }

        if (json.name && json.name.value && json.name.value.length <= 40
            && json.ticker && json.ticker.value
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