import {Payment,Invoice} from '../../types/interfaces';

const http = require("superagent");

import {statsd} from '../../lib/stats/statsd'

import {generateInvoice} from '../../lib/invoice';

import { I_Address } from '../../types/interfaces';

async function createInvoice(accountId: number, amount: number) {

  let start = new Date().getTime()

  let invoice = await generateInvoice(accountId, amount, 'ZEC');

  statsd.timing('ZEC_createInvoice', new Date().getTime()-start)

  statsd.increment('ZEC_createInvoice')

  return invoice;

}

async function checkAddressForPayments(address:string,currency:string){
  
  let start = new Date().getTime()

  let payments: Payment[]=[];

  let resp = await http.get(`https://chain.so/api/v2/get_tx_received/${currency}/${address}`)
   
  for (let tx of resp.body.data.txs){

    let p: Payment = { 

      currency: currency,

      address: resp.body.data.address,

      amount: tx.value,

      hash: tx.txid

      };  

      payments.push(p)

      }

    statsd.timing('ZEC_checkAddressForPayments', new Date().getTime()-start)

    statsd.increment('ZEC_checkAddressForPayments')
    
    return payments 
}

async function createAddressForward(record: I_Address) {

  let url = process.env.ZEC_FORWARDING_URL;

  let resp = await http.post(url).send({

    destination: record.value,

    callback_url: 'https://api.anypay.global/zec/address_forward_callbacks'

  });

  return resp.body.input_address;

}

export async function getNewAddress(record: I_Address) {

  let address = await createAddressForward(record);

  return address;

}

const currency = 'ZEC';

const poll = false;

export {

  currency,

  createInvoice,

  checkAddressForPayments,

  poll

};


 
