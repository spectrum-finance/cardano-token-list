# @spectrum-finance/cardano-token-list

[![Tests](https://github.com/spectrum-finance/cardano-token-list/workflows/Tests/badge.svg)](https://github.com/spectrum-finance/cardano-token-list/actions?query=workflow%3ATests)

This package includes a JSON schema for token list used in the Cardano side of the Spectrum Finance interface

## JSON Schema

The JSON schema represents the technical specification for a token list which can be used in a cross-chain dApp
interface, such as the Spectrum Finance Interface.

The JSON schema ID is https://spectrum.fi/tokenlist.schema.json

## Semantic versioning

This repo includes a version field (in package.json), which follows [semantic versioning](https://semver.org/).

List versions must follow the rules:

- Increment major version when tokens are removed or if you've updated the `tokenlist.schema.json` file;
- Increment minor version when tokens are added;
- Increment patch version when tokens already on the list have minor details changed (name, ticker, logo URL, decimals).

Changing a token address or chain ID is considered both a remove and an add, and should be a major version update.

The latest version of Spectrum Finance Cardano token list stores [here](https://spectrum.fi/cardano-token-list.json).

## Adding a token

If you have already added your token to the
official [cardano-token-registry](https://github.com/cardano-foundation/cardano-token-registry) then it will be added to
this Cardano token list automatically within 24 hours.
If you would like to overwrite some token values or add links to socials,
fill [Token Request issue](https://github.com/spectrum-finance/cardano-token-list/issues/new?assignees=&labels=token+request&template=token-request.md&title=Add+%7BTOKEN_TICKER%7D%3A+%7BPROJECT_NAME%7D).

## Disclaimer

Note filing an issue does not guarantee addition to this Cardano token list. We do not review token addition requests in
any particular order, and we do not guarantee that we will review your request to add the token to the list.

### My token is in cardano-token-registry, but I can see it in the cardano-token-list

If you find yourself in a situation where you have successfully added a token to the cardano-token-registry but cannot
locate it in the cardano-token-list, there could be multiple reasons for this:

1. The token data you added may not have been fetched by the cron job from the cardano-token-registry yet. This process
   occurs automatically once every 24 hours.
2. The token's `name` or `ticker` might not align with the required schema.