const { version } = require("../package.json");
const cardanoLocalList = require("./tokens.json");
const parseCardanoTokenRegistry = require("./utils/parseCardanoTokenRegistry.js");

function sortList(list) {
  return list.sort(function (t1, t2) {
    if (t1.ticker && t2.ticker) {
      return t1.ticker.toLowerCase() < t2.ticker.toLowerCase() ? -1 : 1;
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
  });
}

module.exports = async function buildTokenList() {
  const parsedVersion = version.split(".");

  const cardanoRegistryList = await parseCardanoTokenRegistry();

  return {
    name: "Spectrum Finance Cardano Token List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsedVersion[0],
      minor: +parsedVersion[1],
      patch: +parsedVersion[2],
    },
    tags: {},
    keywords: ["spectrum finance", "tokens", "cardano tokens"],
    tokens: [
      ...[
        {
          name: "KITUP",
          ticker: "KITUP",
          subject:
            "b166a1047a8cd275bf0a50201ece3d4f0b4da300094ffcc668a6f4084b49545550",
          policyId: "b166a1047a8cd275bf0a50201ece3d4f0b4da300094ffcc668a6f408",
          decimals: 0,
          description: "Meme",
          url: "",
        },
        {
          name: "TOOL",
          ticker: "TOOL",
          subject:
            "ac015c38917f306a84748c2d646bed90bdd64421c592163e60702d735453555255",
          policyId: "ac015c38917f306a84748c2d646bed90bdd64421c592163e60702d73",
          decimals: 0,
          description: "Meme",
          url: "",
        },
        {
          name: "COPE",
          ticker: "COPE",
          subject:
            "0b3518ac0f78ced3de283dce6c997228cff2b07c283a16530efd700f434f5045",
          policyId: "0b3518ac0f78ced3de283dce6c997228cff2b07c283a16530efd700f",
          decimals: 0,
          description: "Meme",
          url: "",
        },
        {
          name: "AI",
          ticker: "AI",
          subject:
            "d542ad1dc269ae601125e8259cb8427c6b37c1d3569d10441df0291f4149",
          policyId: "d542ad1dc269ae601125e8259cb8427c6b37c1d3569d10441df0291f",
          decimals: 0,
          description: "Meme",
          url: "",
        },
        {
          name: "R1CH",
          ticker: "R1CH",
          subject:
            "32569e3583d126fc5f3bd1f44d9e09bde77542d762c3796fa551fc6052314348",
          policyId: "32569e3583d126fc5f3bd1f44d9e09bde77542d762c3796fa551fc60",
          decimals: 0,
          description: "Meme",
          url: "",
        },
      ],
      ...sortList(mergeBySubject(cardanoRegistryList, cardanoLocalList)),
    ],
  };
};
