const Account = require("../../../lib/models/account");
const Joi = require('joi');
const _ = require('underscore');

function CoinsFromAccount(account) {
  var coins = {

    'DASH': {
      code: 'DASH',
      name: 'dash',
      enabled: false
    },
    'BCH': {
      code: 'BCH',
      name: 'bitcoin cash',
      enabled: false
    },
    'BTC': {
      code: 'BTC',
      name: 'bitcoin',
      enabled: false
    },
    'LTC': {
      code: 'LTC',
      name: 'litecoin',
      enabled: false
    },
    'XRP': {
      code: 'XRP',
      name: 'ripple',
      enabled: false
    },
    'DOGE': {
      code: 'DOGE',
      name: 'dogecoin',
      enabled: false
    },
    'ZEC': {
      code: 'ZEC',
      name: 'zcash',
      enabled: false
    },
    'BTC.lightning': {
      code: 'BTC',
      name: 'BTC Lightning',
      enabled: false
    }
  };

  if (account.bitcoin_payout_address) {
    coins['BTC'].enabled = true;
  }

  if (account.dash_payout_address) {
    coins['DASH'].enabled = true;
  }

  if (account.bitcoin_cash_address) {
    //coins['BCH'].enabled = true;
  }

  if (account.litecoin_address) {
    coins['LTC'].enabled = true;
  }

  if (account.ripple_address) {
    coins['XRP'].enabled = true;
  }

  if (account.zcash_t_address) {
    coins['ZEC'].enabled = true;
  }

  if (account.dogecoin_address && account.dogecoin_enabled) {
    coins['DOGE'].enabled = true;
  }

  if (account.lightning_uri) {
    coins['BTC.lightning'].enabled = true;
  }

  return coins;
}

/**
 * @api {get} /coins Request User Supported Coins
 * @apiName GetCoins
 * @apiGroup Coin
 *
 * @apiError AccountNotFound No Account was found with access_token provided
 *
 * @apiSuccess {String} code Currency code of the coin
 * @apiSuccess {String} name Display name of currency in English
 * @apiSuccess {Boolean} enabled false if account support for coin is disabled
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "coins": [{
 *         "code": "BTC",
 *         "name": "bitcoin",
 *         "enabled": false
 *       },{
 *        "code": "DASH",
 *        "name": "dash",
 *        "enabled": true
 *       }]
 *     }
 */
module.exports.list = async function(request, reply) {

  let accountId = request.auth.credentials.accessToken.account_id;

  var account = await Account.find({ where: { id: accountId }})

  let accountCoins = CoinsFromAccount(account);

  return {
    'coins': Object.values(accountCoins)
  };
}

const Coin = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  enabled: Joi.boolean().required(),
}).label('Coin')

module.exports.CoinsIndexResponse = Joi.object({
  coins: Joi.array().items(Coin).label('Coins')
}).label('CoinsIndexResponse');
