const bcrypt = require('bcrypt');
const log = require('winston');
const Slack = require('../../../lib/slack/notifier');
const Boom = require('boom');


import { geocode } from '../../../lib/googlemaps';

import {emitter} from '../../../lib/events'

import * as models from '../../../lib/models';

import { getROI } from '../../../lib/roi';

import { Account, AccessToken } from '../../../lib/models';

function hash(password) {
  return new Promise((resolve, reject) => {

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) { return reject(error) }
      resolve(hash);
    })
  });
}

export async function sudoShow (request, reply) {

   var account = await Account.findOne({
    where: {
      id: request.params.account_id
    }
  });

   return account;
};

export async function sudoAccountWithEmail (request, reply) {

  var account = await Account.findOne({
    where: {
      email: request.params.email
    }
  });

  return account;
}

export async function index(request, reply) {

  let limit = parseInt(request.query.limit) || 100;
  let offset = parseInt(request.query.offset) || 0;

  var accounts = await Account.findAll({ offset, limit });

  return accounts;
};

export async function destroy(request, reply) {

  let account = await Account.findOne({
    where: { id: request.params.account_id }
  });

  if (!account) {
    log.error(`account ${request.params.account_id} not found`);
    return { error: 'account not found' };
  }

  await models.AccessToken.destroy({
    where: {
      account_id: account.id
    }
  });

  await models.Address.destroy({
    where: {
      account_id: account.id
    }
  });

  await models.Invoice.destroy({
    where: {
      account_id: account.id
    }
  });

  await models.Account.destroy({
    where: {
      id: account.id
    }
  });

  return { success: true };
};

export async function calculateROI(req, reply){

  try{

   let roi = await getROI(req.params.id)

   return roi;

  }catch(error){

    console.log(error)

    return(error)

  }

}
