
import { isURL } from 'validator'

import { createWebhook } from './webhooks'

import { Account } from './account'

import { computeInvoiceURI } from './uri'

import { models } from './models'

import { v4 } from 'uuid'

import { OrmRecord } from './orm'

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

export class Invoice {

  record: any;

  constructor(record: any) {
    this.record = record;
  }

  async save() {
    return this.record.save()
  }

  get toJSON(): any {
    return this.record.toJSON()
  }

  get account_id(): any {
    return this.record.account_id
  }

  get uid(): string {
    return this.record.uid
  }

  get webhook_url(): string {

    return this.record.webhook_url

  }

  async getAccount(): Promise<Account> {

    let record = await models.Account.findOne({
      where: { id: this.record.account_id }
    })

    return new Account(record)

  }

}

export async function createInvoice(params: NewInvoice): Promise<Invoice> {


  const uid = v4();

  var newInvoice: any = {

    denomination_currency: params.account.denomination,

    denomination_amount: params.amount,

    currency: params.account.denomination,

    amount: params.amount,

    account_id: params.account.id,

    status: 'unpaid',

    uid,

    uri: computeInvoiceURI({

      currency: 'ANYPAY',

      uid

    })

  }

  if (params.webhook_url) {

    if (isURL(params.webhook_url, {protocols: 'https'})) {

      newInvoice['webhook_url'] = params.webhook_url

    } else {

      throw new InvalidWebhookURL(params.webhook_url)

    }
  }

  var invoice = await models.Invoice.create(newInvoice);

  if (params.webhook_url) {

    await createWebhook({

      invoice_uid: uid,

      url: params.webhook_url

    })
  }

  return new Invoice(invoice)

}

