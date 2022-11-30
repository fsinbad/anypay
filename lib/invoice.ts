import {plugins} from './plugins';

import { BigNumber } from 'bignumber.js';

import { Account } from './account'

import * as moment from 'moment';

import * as pay from './pay';

import * as _ from 'underscore';

import { log } from './log'

import { models } from './models';

import {convert} from './prices';

import {getCoin} from './coins';

import * as shortid from 'shortid'

import { computeInvoiceURI } from './uri';

import { PaymentOption } from './payment_option';
import { findAll, findOne } from './orm';
import { PaymentRequest } from './payment_requests';
import { Invoice } from './invoices';

interface Address {
  currency: string,
  value: string
}

async function getNewInvoiceAddress(accountId: number, currency: string, amount): Promise<Address> {
  var address;

  address = await plugins.getNewAddress(currency, accountId, amount);

  if (!address) {
    throw new Error(`unable to generate address for ${currency}`);
  }

  return {
    currency,
    value: address
  }

};

interface EmptyInvoiceOptions {
  uid?: string;
  currency?: string;
  amount?: number;
  webhook_url?: string;
  secret?: string;
  metadata?: any;
  memo?: string;
  redirect_url?: string;
}

export async function createEmptyInvoice(app_id: number, options: EmptyInvoiceOptions = {}) {

  var { uid, currency, amount, webhook_url, memo, secret, metadata, redirect_url } = options

  uid = !!uid ? uid : shortid.generate();

  let app = await models.App.findOne({ where: { id: app_id }})

  if (!app) {
    throw new Error('app not found')
  }

  let uri = computeInvoiceURI({
    currency: 'ANYPAY',
    uid
  })

  let record = await models.Invoice.create({
    app_id,
    account_id: app.account_id,
    uid,
    uri,
    currency,
    amount,
    webhook_url,
    memo,
    secret,
    metadata,
    redirect_url
  })

  console.log('__EMPTY RECORD', record)

  return record;

}

export async function refreshInvoice(uid: string): Promise<Invoice> {

  let invoice = await models.Invoice.findOne({ where: { uid }})

  const paymentOptions: PaymentOption[] = await findAll<PaymentOption>(PaymentOption, {
    where: {
      invoice_uid: uid
    }
  })

  const paymentRequest: PaymentRequest = await findOne<PaymentRequest>(PaymentRequest, {

    where: {

      invoice_uid: invoice.uid
    }
  })

  for (let option of paymentOptions) {

    const template = paymentRequest.get('template').find(template => template.currency === option.currency)[0]

    const outputs = await Promise.all(template.to.map(async (to) => {

      const { currency, value } = to

      const conversion = await convert({ currency, value }, option.currency)

      const amount = pay.toSatoshis(conversion.value, option.currency)

      return {

        address: to.address,

        amount

      }

    }))

    await option.set('outputs', outputs)

  }

  await invoice.set('expiry', moment().add(15, 'minutes').toDate())

  log.info('invoice.refreshed', {
    invoice_uid: invoice.uid
  })

  return invoice

}

async function listAvailableAddresses(account: Account): Promise<Address[]> {

  let addresses = await models.Address.findAll({ where: {
    account_id: account.id
  }});

  addresses = _.reject(addresses, (address) => {
    let coin = getCoin(address.currency);
    if (!coin) { return true }

    return coin.unavailable;
  });

  return addresses

}

// TODO: Only create options from existing options coins if options exist
export async function createPaymentOptions(account, invoice): Promise<PaymentOption[]> {

  let addresses = await listAvailableAddresses(new Account(account))

  let paymentOptions: PaymentOption[] = await Promise.all(addresses.map(async record => {

    const currency = record.currency

    let coin = getCoin(record.currency)

    const value = invoice.get('amount')

    let { value: amount } = await convert({
      currency: account.denomination,
      value
    }, currency, coin.precision);

    let address = (await getNewInvoiceAddress(account.id, currency, amount)).value;

    let paymentCoin = getCoin(currency);

    if (address.match(':')) {
      address = address.split(':')[1]
    }

    var paymentAmount = pay.toSatoshis(amount, currency)

    let fee = await pay.fees.getFee(currency, paymentAmount)

    paymentAmount = new BigNumber(paymentAmount).minus(fee.amount).toNumber();

    let outputs = []

    outputs.push({
      address,
      amount: paymentAmount
    })

    outputs.push({
      address: fee.address,
      amount: fee.amount
    })

    let uri = computeInvoiceURI({
      currency: currency,
      uid: invoice.uid
    });

    amount = outputs.reduce((sum, output) => {

      return sum.plus(output.amount)

    }, new BigNumber(0)).toNumber()

    let optionRecord = await models.PaymentOption.create({
      currency_name: paymentCoin.name,
      invoice_uid: invoice.uid,
      currency,
      amount,
      address,
      outputs,
      uri,
      fee: fee.amount
    })

    return new PaymentOption(invoice, optionRecord)

  }));

  return paymentOptions
}


export function isExpired(invoice) {
  let expiry = moment(invoice.expiry);  
  let now = moment()

  return now > expiry;
}

export async function ensureInvoice(uid: string): Promise<any> {

  let invoice = await models.Invoice.findOne({ where: { uid }});

  if (!invoice) {
    throw  new Error(`invoice ${uid} not found`)
  }

  return invoice;

}

