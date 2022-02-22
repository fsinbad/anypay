require('dotenv').config();

if (process.env.NODE_ENV === 'test' && process.env.TEST_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
}

import { prices } from '../lib';

(async () => {

  await prices.setAllCryptoPrices()
  await prices.setAllFiatPrices()

  process.exit(0);

})();

