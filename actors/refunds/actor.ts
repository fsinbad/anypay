/*
    This file is part of anypay: https://github.com/anypay/anypay
    Copyright (c) 2017 Anypay Inc, Steven Zeiler

    Permission to use, copy, modify, and/or distribute this software for any
    purpose  with  or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE  SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH  REGARD  TO  THIS  SOFTWARE  INCLUDING  ALL  IMPLIED  WARRANTIES  OF
    MERCHANTABILITY  AND  FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY  SPECIAL ,  DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER  RESULTING  FROM  LOSS  OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION  OF  CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
//==============================================================================

/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor, log } from 'rabbi';

import { models } from '../../lib/models'
import { exchange } from '../../lib/amqp';

export async function start() {

  // This actor should respond to invoice.paid events for invoices where
  // the app_id is set to the refunds app.

  Actor.create({

    exchange,

    routingkey: 'invoice.paid',

    queue: 'update_refund_paid',

  })
  .start(async (channel, msg, json) => {

    const { uid } = json

    const refund = await models.Refund.findOne({

      where: {

        refund_invoice_uid: uid

      }
  
    })

    if (!refund || refund.status === 'paid') {

      return

    }

    const original_invoice = await models.Invoice.findOne({

      where: { uid: refund.original_invoice_uid }

    })

    const refund_invoice = await models.Invoice.findOne({

      where: { uid }

    })

    refund.txid = refund_invoice.hash;

    refund.status = 'paid';

    await refund.save()

    log.info('refund.paid', Object.assign(refund.toJSON(), {
      account_id: original_invoice.account_id,
      invoice_uid: refund.original_invoice_uid
    }))

  });

}

if (require.main === module) {

  start();

}

