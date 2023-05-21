
import { Invoice } from '../../invoices'

import { config } from '../../config'

import { findPaymentOption } from '../../payment_option'

import { log } from '../../log'

import { Protocol } from './schema'

import { find } from '../../plugins'

import { Transaction } from '../../plugin'

import { models } from '../../models'

import { verifyPayment, completePayment, handleUnconfirmedPayment  } from '../'

import { getRequiredFeeRate } from '../required_fee_rate'

export interface SubmitPaymentRequest {
  currency: string;
  chain?: string;
  invoice_uid: string;
  transactions: Transaction[];
  wallet?: string;
}

export interface SubmitPaymentResponse {
  success: boolean;
  transactions: {tx: string}[];
}

export async function submitPayment(payment: SubmitPaymentRequest): Promise<SubmitPaymentResponse> {

  const { invoice_uid, currency } = payment

  const chain = payment.chain ? payment.chain : payment.currency

  try {

    log.info('payment.submit', payment);

    let invoice = await models.Invoice.findOne({ where: { uid: invoice_uid }})

    if (!invoice) {
      throw new Error(`invoice ${payment.invoice_uid} not found`)
    }

    if (invoice.status !== 'unpaid') {
      throw new Error(`Invoice With Status ${invoice.status} Cannot Be Paid`)
    }
    const where = {
      invoice_uid,
      currency: payment.currency,
      chain
    }

    let payment_option = await models.PaymentOption.findOne({ where })

    if (!payment_option) {

      log.info('pay.jsonv2.payment.error.currency_unsupported', {
        invoice_uid,
        currency: payment.currency
      })

      throw new Error(`Unsupported Currency or Chain for Payment Option`)
    }

    let plugin = find({ chain, currency })

    for (const transaction of payment.transactions) {

      const verify: Function = plugin.verifyPayment ? plugin.verifyPayment : verifyPayment

      const verified = await verify({
        payment_option,
        transaction,
        protocol: 'JSONV2'
      })

      if (!verified) {

        log.info(`pay.jsonv2.${chain}.${payment.currency}.verifyPayment.failed`, {
          invoice_uid: invoice.uid,
          transaction,
          protocol: 'JSONV2'
        })

        throw new Error(`pay.jsonv2.${payment.currency.toLowerCase()}.verifyPayment.failed`)
      }

      log.info(`jsonv2.${payment.currency.toLowerCase()}.transaction.submit`, {invoice_uid, transaction })

      var response;

      if (payment_option.currency === 'XMR') {

        response = await plugin.broadcastTx(transaction)

      } else if (payment_option.chain === 'SOL') {

        response = await plugin.broadcastTx(transaction)

        invoice.hash = response

        await invoice.save()

      } else {

        response = await plugin.broadcastTx(transaction)
      }

      log.info(`jsonv2.${payment.currency.toLowerCase()}.transaction.submit.response`, { invoice_uid, transaction, response })

      if (payment_option.currency === 'BTC' && config.get('require_btc_confirmations')) {

        let paymentRecord = await handleUnconfirmedPayment(payment_option, transaction)

        if (payment.wallet) {
          paymentRecord.wallet = payment.wallet
          await paymentRecord.save()
        }
  
        log.info('payment.confirming', paymentRecord);
         
      } else {

        let paymentRecord = await completePayment(payment_option, transaction)

        if (payment.wallet) {
          paymentRecord.wallet = payment.wallet
          await paymentRecord.save()
        }
  
        log.info('payment.completed', paymentRecord);
        
      }

    }

    return {
      success: true,
      transactions: payment.transactions.map(({txhex}) => {
        return { tx: txhex }
      })
    }

  } catch(error) {

    log.error('pay.jsonv2.payment.error', error)

    throw error

  }

}

export async function verifyUnsigned(payment: SubmitPaymentRequest): Promise<SubmitPaymentResponse> {

  const { chain, currency } = payment

  try {

    log.info('payment.unsigned.verify', payment);

    let invoice = await models.Invoice.findOne({ where: { uid: payment.invoice_uid }})

    if (invoice.cancelled) {

      const error = new Error('payment.error.invoice.cancelled')

      log.error('payment.error.invoice.cancelled', error)

      throw error
    }

    if (!invoice) {
      throw new Error(`invoice ${payment.invoice_uid} not found`)
    }

    let payment_option = await models.PaymentOption.findOne({ where: {
      invoice_uid: invoice.uid,
      currency,
      chain
    }})

    if (!payment_option) {
      throw new Error(`Unsupported Currency or Chain for Payment Option`)
    }

    let plugin = find({ chain, currency })

    if (plugin.validateUnsignedTx) {

      const valid = await plugin.validateUnsignedTx({
        payment_option,
        transactions: payment.transactions
      })

      if (valid) {
        
        return {
          success: true,
          transactions: payment.transactions.map(({txhex}) => {
            return {
              tx: txhex
            }
          })
        }

      } else {

        throw new Error('Invalid unsigned transaction')
      }

    }

    for (const transaction of payment.transactions) {

      const verified = await plugin.verifyPayment({
        payment_option,
        transaction,
        protocol: 'JSONV2'
      })

      if (!verified) {

        throw new Error('Invalid unsigned transaction')

      }

    }

    return {
      success: true,
      transactions: payment.transactions.map(({txhex}) => {
        return {
          tx: txhex
        }
      })
    }

  } catch(error) {

    log.error('pay.jsonv2.payment.unsigned.verify.error', error)

    throw error

  }

}


interface ProtocolMessage {}

interface PaymentOption {
  chain: string;
  currency: string;
  network: string;
  estimatedAmount: number;
  requiredFeeRate: number;
  minerFee: number;
  decimals: number;
  selected: boolean;
}

interface PaymentOptions extends ProtocolMessage {
  time: string;
  expires: string;
  memo: string;
  paymentUrl: string;
  paymentId: string;
  paymentOptions: PaymentOption[];
}

interface SelectPaymentRequest extends ProtocolMessage {
  chain: string;
  currency: string;
}

interface Output {
  amount: number;
  address: string;
}

interface XrpOutput extends Output {
  invoiceID: string;
}

interface UtxoInstruction {
  type: string;
  requiredFeeRate: number;
  outputs: Output[];
}

interface EthInstruction {
  type: string;
  value: number;
  to: string;
  data: string;
  gasPrice: number;
}

interface XrpInstruction {
  type: string;
  outputs: XrpOutput[];
}

type Instruction = UtxoInstruction | EthInstruction | XrpInstruction

interface PaymentRequest extends ProtocolMessage {
  time: string;
  expires: string;
  memo: string;
  paymentUrl: string;
  paymentId: string;
  chain: string;
  currency: string;
  network: string;
  instructions: Instruction[];
}

export interface PaymentVerificationRequest {
  chain: string;
  currency: string;
  transactions: Transaction[];
}

interface PaymentVerification {
  payment: Payment;
  memo: string;
}

interface Payment {
  chain: string;
  currency: string;
  transactions: Transaction[];
}

interface PaymentResponse {
  payment: Payment;
  memo: string;
}

export interface LogOptions {
  wallet?: string;
}



export async function listPaymentOptions(invoice: Invoice, options: LogOptions = {}): Promise<PaymentOptions> {

  log.info('pay.jsonv2.payment-options', Object.assign(options, {
    invoice_uid: invoice.uid,
    account_id: invoice.get('account_id')
  }))

  let _paymentOptions = await invoice.getPaymentOptions()

  let paymentOptions = await Promise.all(_paymentOptions.map(async paymentOption => {

    const estimatedAmount = paymentOption.get('outputs')
      .reduce((sum, output) => sum + output.amount, 0)

    const requiredFeeRate = await getRequiredFeeRate({ invoice, chain: paymentOption.get('currency') })

    return {
      currency: paymentOption.get('currency'),
      chain: paymentOption.get('chain'),
      network: 'main',
      estimatedAmount,
      requiredFeeRate,
      minerFee: 0,
      decimals: 0,
      selected: false
    }

  }))

  return {

    time: invoice.get('createdAt'),

    expires: invoice.get('expiry'),

    memo: invoice.get('memo'),

    paymentUrl: `${config.get('API_BASE')}/i/${invoice.uid}`,

    paymentId: invoice.uid,

    paymentOptions

  }
}

export async function getPaymentRequest(invoice: Invoice, option: SelectPaymentRequest, options: LogOptions = {}): Promise<PaymentRequest> {

  if (!option.chain && option.currency) { option.chain = option.currency }
  if (!option.currency && option.chain) { option.currency = option.chain }

  if (option.chain === 'USDC') { option.chain = 'MATIC' }

  await Protocol.PaymentRequest.request.validateAsync(option, { allowUnknown: true })

  let paymentOption = await findPaymentOption({
    invoice,
    currency: option.currency,
    chain: option.chain
  })

  const requiredFeeRate = await getRequiredFeeRate({ invoice, chain: option.currency })

  const result = {

    time: invoice.get('createdAt'),

    expires: invoice.get('expiry'),

    memo: invoice.get('memo'),

    paymentUrl: `${config.get('API_BASE')}/i/${invoice.uid}`,

    paymentId: invoice.uid,

    chain: option.chain,

    currency: option.currency,

    network: 'main',

    instructions: [{

      type: "transaction",

      requiredFeeRate,

      outputs: paymentOption.get('outputs')

    }]

  }

  return result 

}

export async function verifyUnsignedPayment(invoice: Invoice, params: PaymentVerificationRequest, options: LogOptions = {}): Promise<PaymentVerification> {

  log.info('pay.jsonv2.payment-verification', Object.assign({
    invoice_uid: invoice.uid,
    account_id: invoice.get('account_id')
  }, Object.assign(params, options)))

  if (!params.chain && params.currency) { params.chain = params.currency }
  if (!params.currency && params.chain) { params.currency = params.chain }

  let verifyParams: any = params

  verifyParams.transactions = params.transactions.map(transaction => {
    return {
      tx: transaction.txhex,
      tx_key: transaction.txkey
    }
  })

  await Protocol.PaymentVerification.request.validateAsync(verifyParams, { allowUnknown: true })

  await verifyUnsigned({
    invoice_uid: invoice.uid,
    transactions: params.transactions,
    currency: params.currency,
    chain: params.chain
  })

  return {
    payment: params,
    memo: 'Un-Signed Transaction Validated with Success'
  }

}

export async function sendSignedPayment(invoice: Invoice, params: PaymentVerificationRequest, options: LogOptions = {}): Promise<PaymentResponse> {

  log.info('pay.jsonv2.payment', Object.assign({
    invoice_uid: invoice.uid,
    account_id: invoice.get('account_id')
  }, Object.assign(params, options)))

  if (!params.chain && params.currency) { params.chain = params.currency }
  if (!params.currency && params.chain) { params.currency = params.chain }

  await Protocol.Payment.request.validateAsync(params, { allowUnknown: true })

  if (params.currency === 'XMR') {

    for (let tx of params.transactions) {

      if (!tx.txkey || !tx.txid) {

        throw new Error('tx_key and tx_hash required for all XMR transactions')

      }

    }
    
  }

  try {

    let response = await submitPayment({
      chain: params.chain,
      currency: params.currency,
      transactions: params.transactions,
      invoice_uid: invoice.uid
    })

    log.info('pay.jsonv2.payment.submit.response', Object.assign(response, {
      invoice_uid: invoice.uid,
      account_id: invoice.get('account_id')
    }))

    return {
      payment: params,
      memo: 'Transactions accepted and broadcast to the network'
    }

  } catch(error) {

    log.info('pay.jsonv2.payment.error', Object.assign(options, {
      error: error.message,
      invoice_uid: invoice.uid,
      account_id: invoice.get('account_id')
    }))

    throw error

  }
}
