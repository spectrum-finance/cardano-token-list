const { version } = require('./package.json');
const buildList = require('./src/buildList')
const fs = require('fs');
const path = require("path");

async function run() {
    const list = await buildList();
    const tokenList = JSON.stringify(list, null, 2)
    fs.writeFile('cardano-token-list.json', tokenList, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("New cardano token list has been built.");
        console.log("Current version is " + version + ".");
    })
}

run();