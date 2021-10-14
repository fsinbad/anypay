require('dotenv').config();

import * as http from 'superagent';

let BITBOX = require('bitbox-sdk').BITBOX;

const bitbox = new BITBOX();

import {generateInvoice} from '../../lib/invoice';

import {log, models, xpub} from '../../lib';

import { getLegacyAddressFromCashAddress } from './lib/bitbox'

import { I_Address } from '../../types/interfaces';

const bch: any = require('bitcore-lib-cash');

var bchaddr: any = require('bchaddrjs');

export async function submitTransaction(rawTx: string) {

  return broadcastTx(rawTx)

}
export async function broadcastTx(hex: string) {

  return bitbox.RawTransactions.sendRawTransaction(hex);

}

async function createInvoice(accountId: number, amount: number) {

  let start = new Date().getTime()

  let invoice = await generateInvoice(accountId, amount, 'BCH');

  return invoice;

}

function validateAddress(address: string){

  try {

    new bch.HDPublicKey(address);

    return true;

  } catch(error) {

    console.log(error.message);

  }

  try{

    var isCashAddress = bchaddr.isCashAddress

    let valid = isCashAddress(address)

    return valid;

  }catch(error){

    return false;

  }


}

export async function getNewAddress(record: I_Address) {

  var address;

  if (record.value.match(/^xpub/)) {

    address = xpub.generateAddress('BCH', record.value, record.nonce);

    await models.Address.update({

      nonce: record.nonce + 1

    },{

      where: {

        id: record.id

      }
    
    });

    return address;

  } else {

    return record.value;

  }

}

function deriveAddress(xkey, nonce){

  let address = new bch.HDPublicKey(xkey).deriveChild(nonce).publicKey.toAddress().toString()

  return address

}


const currency = 'BCH';

const poll = true;

export {

  currency,

  createInvoice,

  validateAddress,

  poll

};
