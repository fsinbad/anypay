const http = require("superagent")

import {Payment,Invoice} from '../../types/interfaces';

import {statsd} from '../../lib/stats/statsd'

import {generateInvoice} from '../../lib/invoice';

import * as JsonRpc from './lib/jsonrpc';

import { I_Address } from '../../types/interfaces';

var WAValidator = require('anypay-wallet-address-validator');

export function validateAddress(address: string){

  let valid = WAValidator.validate( address, 'LTC')

  return valid;

}
async function createInvoice(accountId: number, amount: number) {

  let start = new Date().getTime()

  let invoice = await generateInvoice(accountId, amount, 'LTC');

  statsd.timing('LTC_createInvoice', new Date().getTime()-start)
  
  statsd.increment('LTC_createInvoice')

  return invoice;

}

async function checkAddressForPayments(address:string, currency:string){
  
  let start = new Date().getTime()

  let payments: Payment[]=[];

  let resp = await http.get(`https://chain.so/api/v2/get_tx_received/${currency}/${address}`)

  for (let tx of resp.body.data.txs){

    let p: Payment = { 
 
      currency: currency,

      address: address,

      amount: tx.value,

      hash: tx.txid

      };  

      payments.push(p)

      }

    statsd.timing('LTC_checkAddressForPayments', new Date().getTime()-start)

    statsd.increment('LTC_checkAddressForPayments')


      return payments;
}

export async function getNewAddress(outputAddress: string) {

  let rpc = new JsonRpc();

  let address = await rpc.call('getnewaddress', []);

  console.log('rpc result', address);

  return address.result;

}

const currency = 'LTC';

const poll = false;

export {

  currency,

  createInvoice,

  checkAddressForPayments,

  poll

};
