const http = require("superagent")

import {Payment,Invoice} from '../../types/interfaces';

import {statsd} from '../../lib/stats/statsd'

import {generateInvoice} from '../../lib/invoice';

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

async function createAddressForward(record: I_Address) {

  let url = process.env.LTC_FORWARDING_URL; 

  let callback_url = `${process.env.API_BASE}/LTC/payments` 

  let resp = await http.post(url).send({

    destination: record.value,

    callback_url: callback_url 

  });

  return resp.body.input_address;

}

export async function getNewAddress(record: I_Address) {

  let address = await createAddressForward(record);

  return address;

}


const currency = 'LTC';

const poll = false;

export {

  currency,

  createInvoice,

  checkAddressForPayments,

  poll

};
