require('dotenv');

import * as Boom from 'boom';
import { awaitChannel } from '../../../lib/amqp';
import { log } from '../../../lib/logger';

import { transformHexToPayments } from '../../../router/plugins/bsv/lib';

export async function create(req, h) {

  log.info('moneybutton.webhook', req.payload);

  try {

    const { secret, payment } = req.payload;

    if (secret !== process.env.MONEYBUTTON_WEBHOOK_SECRET) {
      throw new Error('invalid moneybutton webhook secret');
    }

    const channel = await awaitChannel();

    await channel.publish('anypay.events', 'moneybutton_webhook', Buffer.from(
      JSON.stringify(payment) 
    ))

    let payments = transformHexToPayments(payment.rawtx);

    payments.forEach(anypayPayment => {

      channel.publish('anypay.payments', 'payment', Buffer.from(
        JSON.stringify(anypayPayment)
      ));

    });

    return { success: true }

  } catch(error) {

    return Boom.badRequest(error.message)

  }

}

