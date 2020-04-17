"use strict";
/* implements rabbi actor protocol */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const lib_1 = require("../../lib");
const rabbi_1 = require("rabbi");
/*
 *
 *  -- gettransaction(txid)
 * {
  amount: 0,
  confirmations: 1572,
  blockhash: '0000000000000000000307d2090d024cae160a5c3f32ee66c83dc8a1788975d8',
  blockindex: 674,
  blocktime: 1565900821,
  txid: '23ccfdda936e7a48eda44ed403165a7863e368b1414bf6eb7cfc07e4847d9c01',
  walletconflicts: [],
  time: 1565899996,
  timereceived: 1565899996,
  'bip125-replaceable': 'no',
  details: [],
  hex: '01000000011286a08ad28e067e6d7e0ba76ca0827f5a41847e243a166ce615475b98a38e93000000006b483045022100e7ea4e4c3d584651a0423f400f6c7f095a0faac7a1f72e4d3cc373f937cc5030022078db1ea8629371bc3a85aee66f9be845d1c35df288ee9ba38e0c978b7ac7f73201210390b2916fe15c5403bbb0d337559f6ccba5f9fc60de2cafdeb58b7e678e9b7380ffffffff02606d0000000000001976a91456f102655b032a5cd93e47bf01934a61923c1b9988ac584f0000000000001976a9149c72a5f0c62514b5b02d11ea6fedd7651028725788ac00000000'
}
 *
 *
 */
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        rabbi_1.Actor.create({
            exchange: 'anypay.router',
            routingkey: 'transaction.bsv',
            queue: 'publish.bsv.payment',
            schema: rabbi_1.Joi.object().keys({
                hex: rabbi_1.Joi.string().required()
            })
        })
            .start((channel, msg, json) => __awaiter(this, void 0, void 0, function* () {
            let payments = lib_1.transformHexToPayments(json.hex);
            payments.forEach((payment) => {
                console.log(payment);
                channel.publish('anypay.payments', 'payment', Buffer.from(JSON.stringify(payment)));
                channel.publish('anypay.payments', 'payment.bsv', Buffer.from(JSON.stringify(payment)));
                channel.publish('anypay.payments', `payment.bsv.${payment.address}`, Buffer.from(JSON.stringify(payment)));
            });
            channel.ack(msg);
        }));
    });
}
exports.start = start;
if (require.main === module) {
    start();
}
//# sourceMappingURL=actor.js.map