# @spectrum-finance/cardano-token-list

This repository contains a cron which updates Spectrum Finance [cardano-token-list](https://spectrum.fi/cardano-token-list.json) based on [cardano-token-registry](https://github.com/cardano-foundation/cardano-token-registry) every 10 minutes.

### My token is in cardano-token-registry, but I can see it in the cardano-token-list

If you find yourself in a situation where you have successfully added a token to the cardano-token-registry but cannot
locate it in the cardano-token-list, there could be multiple reasons for this:

1. The token data you added may not have been fetched by the cron job from the cardano-token-registry yet. This process
   occurs automatically once every 24 hours.
2. The token's `name` or `ticker` might not align with the required schema.