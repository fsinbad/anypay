#!/usr/bin/env ts-node
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
require('dotenv').config(); 
import { Command } from 'commander';
const program = new Command();

import { coins, log, models, invoices } from '../lib';

import { invoicePaidEmail } from '../lib/email';

import { listInvoiceEvents } from '../lib/events'

import { ensureInvoice } from '../lib/invoices'


program
  .command('events <invoice_uid>')
  .action(async (invoice_uid) => {

    try {
      
      let invoice = await ensureInvoice(invoice_uid)

      let events = await listInvoiceEvents(invoice)

      for (let event of events) {

        console.log(event.toJSON())

      }

    } catch(error) {

      console.log(error)

      log.error('events.error', error);

    }

    process.exit(0);

  });

program
  .command('refresh <invoice_uid>')
  .action(async (uid) => {

    try {

      await coins.refreshCoins()

      await invoices.refreshInvoice(uid)

    } catch(error) {

      console.log(error)

    }

    process.exit(0);

  })

program
  .command('sendemailreceipt <invoice_uid>')
  .action(async (uid) => {

    try {

      let invoice = await models.Invoice.findOne({ where: {
        uid
      }});

      await invoicePaidEmail(invoice);

    } catch(error) {

      console.log(error);
    }

    process.exit(0);

  });

program
  .command('info <invoice_uid>')
  .action(async (uid) => {

    try {

      let invoice = await models.Invoice.findOne({
        where: {
          uid
        },
        include: [{
          model: models.Payment,
          as: 'payment'
        }, {
          model: models.Refund,
          as: 'refund'
        }]
      });

      console.log(invoice.toJSON())

    } catch(error) {

      console.log(error);
    }

    process.exit(0);

  });

program.parse(process.argv);

