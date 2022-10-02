require('dotenv').config()
const btc = require('bitcore-lib')

export { btc as bitcore }

import { oneSuccess } from 'promise-one-success'

import { blockchair, config, chain_so } from '../../lib'

import { BroadcastTxResult } from '../../lib/plugins'

import * as bitcoind_rpc from './bitcoind_rpc'

export async function broadcastTx(rawTx: string): Promise<BroadcastTxResult> {

  const broadcastProviders: Promise<BroadcastTxResult>[] = []

  if (config.get('blockchair_broadcast_provider_btc_enabled')) {

    broadcastProviders.push(

      blockchair.publish('bitcoin', rawTx)
    )

  }

  if (config.get('chain_so_broadcast_provider_enabled')) {

    broadcastProviders.push(

      chain_so.broadcastTx('BTC', rawTx)
    )

  }

  if (config.get('bitcoind_rpc_host')) {

    broadcastProviders.push(
      
      bitcoind_rpc.broadcastTx(rawTx)
    )
  }

  return oneSuccess<BroadcastTxResult>(broadcastProviders)

}

export function transformAddress(address: string) {

  if (address.match(':')) {

    address = address.split(':')[1]

  }

  return address;

}

export function validateAddress(address: string){

  try {

    new btc.Address(address)
  
    return true

  } catch(error) {

    throw new Error('Invalid BTC address. SegWit addresses not supported. Use 1 or 3-style addresses.')

  }

}

export async function getNewAddress(deprecatedParam){

  return deprecatedParam.value;

}

