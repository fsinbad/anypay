
import { loginAccount, geolocateAccountFromRequest } from '../../../lib/accounts/registration'

import { ensureAccessToken } from '../../../lib/access_tokens'

import { log } from '../../../lib/log'
import AuthenticatedRequest from '../../auth/AuthenticatedRequest';
import { ResponseToolkit } from '@hapi/hapi';

export async function create(request: AuthenticatedRequest, h: ResponseToolkit) {

  var account;

  try {

    account = await loginAccount(request.payload as {
        
        email: string,
  
        password: string,
  
      
    })

  } catch(error: any) {

    log.error('login.error', error)

    return h.response({ error: error.message }).code(401)

  }

  geolocateAccountFromRequest(account, request)

  const accessToken = await ensureAccessToken(account)

  return h.response({

    user: account,

    accessToken,

  }).code(200)

}

