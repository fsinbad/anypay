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

import { expect, newAccountWithInvoice } from '../utils'

import { log } from '../../lib/log'

import { getRefund, Refund, RefundErrorInvoiceNotPaid } from '../../lib/refunds'

import * as uuid from 'uuid'

import { createHash } from 'crypto'
import prisma from '../../lib/prisma'

describe('lib/refunds', () => {

  it.skip('#getRefund should return a Refund for an Invoice given explicit refund address', async () => {

    const [account, invoice] = await newAccountWithInvoice()

    log.debug('test.account.created', account)

    await prisma.invoices.update({
      where: {
        id: invoice.id
      },
      data: {
        status: 'paid',
        invoice_currency: 'DASH',
        denomination_currency: 'USD',

        denomination_amount_paid: 52.00
      }
    })

    try {

      const refund: Refund = await getRefund(invoice, 'XxarAzZrvZdZfqWPwCqJCK3Fyd2PMg38wy')

      expect(refund.refund_invoice_uid).to.be.a('string')

      expect(refund.status).to.be.equal('unpaid')

      expect(refund.address).to.be.equal('XxarAzZrvZdZfqWPwCqJCK3Fyd2PMg38wy')

      expect(refund.original_invoice_uid).to.be.equal(invoice.uid)

    } catch(error) {

      throw error

    }

  })

  it.skip('#getRefund should detect the refund address if not explicitly provided', async () => {

    const txid = createHash('sha256').update(uuid.v4(), 'utf8').digest()

    const [account, invoice] = await newAccountWithInvoice()

    log.debug('test.account.created', account)

    await prisma.invoices.update({
      where: {
        id: invoice.id
      },
      data: {
        status: 'paid',
        invoice_currency: 'BCH',
        denomination_currency: 'USD',
        denomination_amount_paid: '52.00',
        hash: txid.toString()
      }
    })

    const refund: Refund = await getRefund(invoice) as Refund

    expect(refund.refund_invoice_uid).to.be.a('string')

    expect(refund.status).to.be.equal('unpaid')

    expect(refund.address).to.be.equal('bitcoincash:qrk5wv9yyxhs00xt7qwj8u6xm89mar3ucsv2gxessa')

    expect(refund.original_invoice_uid).to.be.equal(invoice.uid)

  })

  it('#getRefund should reject for an invoice that is not yet paid', async () => {

    const [account, invoice] = await newAccountWithInvoice()

    log.debug('test.account.created', account)

    expect(

      getRefund(invoice)

    )
    .to.be.eventually.rejectedWith(RefundErrorInvoiceNotPaid)

  })

})
 
