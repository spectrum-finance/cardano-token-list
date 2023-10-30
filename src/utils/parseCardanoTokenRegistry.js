const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");

module.exports = function parseCardanoTokenRegistry() {
    return new Promise((resolve, reject) => {
        simpleGit().submoduleUpdate(['--init'], (err) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
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

                if (!json.decimals) {
                    token.decimals = 0;
                } else {
                    token.decimals = json.decimals.value;
                }

                if (!json.ticker) {
                    token.ticker = ''
                } else {
                    token.ticker = json.ticker.value.trim();
                }

                if (!json.description) {
                    token.description = ''
                } else {
                    token.description = json.description.value.trim();
                }

                if (!json.name) {
                    token.name = ''
                } else {
                    token.name = json.name.value.trim();
                }

                if (json.url && json.url.value) {
                    token.url = json.url.value.trim();
                } else {
                    token.url = ''
                }

                list.push(token);
            })
            return resolve(list);
        });
    })
}
