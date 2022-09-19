// A `cron` will call the provided default function on the interval given

// export const interval = 'CRON PATTERN'

import { app } from 'anypay'

export default async function({ log, config }) {

  const token = config.get('interval_wallet_bot_access_token')

  const anypay = app(token)

  const address = config.get('interval_wallet_bot_dash_address')

  if (!address) {
    throw new Error('interval_wallet_bot_dash_address config variable required')
  }

  const amount = Math.floor(Math.random() * 10) / 10; // between $0.10 and $1.00

  // ask wallet bot to send payment with two outputs each to the same address
  const request = await anypay.request([{
    currency: 'DASH',
    to: [{
      currency: 'USD',
      amount: amount / 2,
      address
    }, {
      currency: 'USD',
      amount: amount / 2,
      address
    }]
  }])

  log.info('rabbi.cron.wallet_bot_send_dash_on_interval.payment-request.created', request)

}

// every five seconds
export const pattern = '*/5 * * * * *'

