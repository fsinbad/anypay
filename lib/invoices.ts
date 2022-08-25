
const validator = require('validator')

import { log } from './log'

import { config } from './config'

import { Event } from './events'

import { createWebhook } from './webhooks'

import { Account, findAccount } from './account'

import { PaymentOption } from './payment_option'

import { computeInvoiceURI } from './uri'

import { models } from './models'

import { Orm } from './orm'

import * as shortid from 'shortid';

import { createPaymentOptions } from './invoice'

export class InvoiceNotFound implements Error {
  name = 'InvoiceNotFound'
  message = 'Invoice Not Found'
}

export async function ensureInvoice(uid: string) {

  let record = await models.Invoice.findOne({
    where: { uid }
  })


  if (!record) { throw new InvoiceNotFound() }

  return new Invoice(record)

}
export async function getInvoice(uid: string) {

  let record = await models.Invoice.findOne({
    where: { uid }
  })

  if (!record) { return }

  return new Invoice(record)

}

interface NewInvoice {

  account: Account;

  amount: number;

  webhook_url?: string;

  external_url?: string;

}

export class InvalidWebhookURL implements Error {

  name = 'InvalidWebhookURL'

  message = 'webhook_url parameter must be a valid HTTPS URL'

  constructor(invalidURL: string) {

    this.message = `${this.message}: received ${invalidURL}`
  }
}

export class Invoice extends Orm {

  static model = models.Invoice;

  get account_id(): any {

    return this.get('account_id')
  }

  get denomination(): string {

    return this.get('denomination_currency')

  }

  get payment(): any {
    return this.record['payment']
  }

  get refund(): any {
    return this.record['refund']
  }

  get status(): string {

    return this.get('status')
  }

  get uid(): string {

    return this.get('uid')
  }

  get webhook_url(): string {

    return this.get('webhook_url')

  }

  toJSON() {

    let json = super.toJSON()

    Object.keys(json).forEach(key => {
      if (json[key] === undefined) {
        delete json[key];
      }

      if (json[key] === null) {
        delete json[key];
      }

      if (json[key] === NaN) {
        delete json[key];
      }
    });

    delete json.currency
    delete json.cancelled
    delete json.locked
    delete json.replace_by_fee
    delete json.denomination_amount
    delete json.denomination_currency
    delete json.account_id
    delete json.id
    delete json.complete
    delete json.headers
    delete json.currency_specified
    delete json.currency_specified
    delete json.updatedAt

    return json

  }

  async getAccount(): Promise<Account> {

    let record = await models.Account.findOne({
      where: { id: this.get('account_id') }
    })

    return new Account(record)

  }


  async getPaymentOptions(): Promise<PaymentOption[]> {

    let records = await models.PaymentOption.findAll({
      where: { invoice_uid: this.get('uid') }
    })

    return records.map(record => new PaymentOption(this, record))

  }

}

interface CreateInvoice {
  account: Account,
  amount: number;
  currency?: string;
  fee_rate_level?: string;
  redirect_url?: string;
  webhook_url?: string;
  wordpress_site_url?: string;
  external_id?: string;
  memo?: string;
  email?: string;
  business_id?: string;
  location_id?: string;
  register_id?: string;
}

export async function createInvoice(params: CreateInvoice): Promise<Invoice> {

  const uid = shortid.generate();

  var { webhook_url, account, amount, currency } = params

  if (!webhook_url) {

    webhook_url = account.get('webhook_url')

  }

  const newInvoice: any = {

    denomination_currency: currency || account.denomination,

    denomination_amount: amount,

    currency: currency || account.denomination,

    amount: amount,

    account_id: account.id,

    webhook_url,

    external_id: params.external_id,

    business_id: params.business_id,

    location_id: params.location_id,

    register_id: params.register_id,

    memo: params.memo,

    wordpress_site_url: params.wordpress_site_url,

    fee_rate_level: params.fee_rate_level,

    status: 'unpaid',

    uid,

    uri: computeInvoiceURI({

      currency: 'ANYPAY',

      uid

    })

  }

  var record = await models.Invoice.create(newInvoice);

  let invoice = new Invoice(record)

  await createWebhook(invoice)

  const options = await createPaymentOptions(account.record, invoice)

  log.info('invoice.created', record.toJSON())

  return invoice;

}

