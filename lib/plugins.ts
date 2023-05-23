require("dotenv").config();
require('bitcore-lib')

import configurePlugins from "../config/plugins";

export const plugins = configurePlugins()

import { Plugin, Transaction } from './plugin'

import { Account } from './account'

import { Address } from './addresses'

import { PaymentOption } from './payment_option'

export function find({currency, chain }: {currency: string, chain: string}): Plugin {

  let plugin = chain === currency ? plugins[currency] : plugins[`${currency}.${chain}`]

  if (!plugin) {

    throw new Error(`no plugin found for currency ${currency} on chain ${chain}`) 

  }

  return new plugin()
}


export async function getTransaction({ txid, chain, currency }: { txid: string, chain: string, currency: string }): Promise<Transaction> {

  let plugin = find({ chain, currency }) 

  return plugin.getTransaction(txid)

}

export async function getNewAddress({ address, account, chain, currency }: { address: Address, account: Account, chain: string, currency: string }): Promise<string> {

  let plugin = find({ chain, currency }) 

  return plugin.getNewAddress({ account, address })

}

export function toSatoshis({decimal, currency, chain}:{ decimal: number, currency: string, chain: string }): number {

  const plugin = find({ currency, chain })

  return plugin.toSatoshis(decimal)

}

export function fromSatoshis({integer,currency,chain}: {integer: number, currency: string, chain: string }): number {

  const plugin = find({ currency, chain })

  return plugin.fromSatoshis(integer)

}

export function buildSignedPayment({paymentOption,mnemonic}: {paymentOption: PaymentOption, mnemonic: string}): Promise<Transaction> {

  const { currency, chain } = paymentOption

  const plugin = find({ currency, chain })

  return plugin.buildSignedPayment({ paymentOption, mnemonic })

}

export function verifyPayment({paymentOption,transaction}: {paymentOption: PaymentOption, transaction: Transaction }): Promise<boolean> {

  const { currency, chain } = paymentOption

  const plugin = find({ currency, chain })

  return plugin.verifyPayment({ paymentOption, transaction })

}

