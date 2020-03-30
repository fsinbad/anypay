require('dotenv').config();
import * as bitcoin from 'bsv';
import BigNumber from 'bignumber.js';

import {models} from '../../../lib';

interface Output{
  script: string;
  amount: number;
}

interface PaymentRequest{
    network:string;
    outputs :Output[];
    creationTimestamp: Date;
    expirationTimestamp: Date;
    memo: string;
    paymentUrl:string; 
    merchantData: string;
}

export async function generatePaymentRequest(invoice: any, paymentOption: any):Promise<PaymentRequest>{
  console.log('invoice', invoice);
  console.log('invoice', invoice);

  let account = await models.Account.findOne({ where: { id: invoice.account_id }});

  let address = new bitcoin.Address(paymentOption.address);

  let script = new bitcoin.Script(address);

  let anypayAddress = new bitcoin.Address(process.env.BIP_270_EXTRA_OUTPUT_ADDRESS);
  let anypayScript = new bitcoin.Script(anypayAddress);

  let request = {
    network:"bitcoin-sv",
    outputs: [{
      script: script.toHex(),
      amount: bsvToSatoshis(paymentOption.amount)
    }, {
      script: anypayScript.toHex(),
      amount: 1000
    }],
    creationTimestamp: invoice.createdAt,
    expirationTimestamp: invoice.expiry,
    memo: "Bitcoin SV Payment Request | Anypay Inc",
    paymentUrl: `${process.env.API_BASE}/invoices/${invoice.uid}/pay`,
    merchantData: JSON.stringify({
      invoiceUid: invoice.uid,
      merchantName: account.business_name,
      avatarUrl: account.image_url
    })
  }

  console.log(request)

  return request

}

function bsvToSatoshis(bsv): number{
  let amt = new BigNumber(bsv); 
  let scalar = new BigNumber(100000000);

  return amt.times(scalar).toNumber();
}

