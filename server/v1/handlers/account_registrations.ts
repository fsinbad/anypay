
import { geolocateAccountFromRequest, registerAccount } from '../../../lib/accounts/registration'

import { ensureAccessToken } from '../../../lib/access_tokens'
import AuthenticatedRequest from '../../auth/AuthenticatedRequest'
import { ResponseToolkit } from '@hapi/hapi'
import { generateAccountToken } from '../../../lib/jwt'

export async function create(request: AuthenticatedRequest, h: ResponseToolkit) {

  const account = await registerAccount(request.payload as {
    email: string,
    password: string
  
  })

  geolocateAccountFromRequest(account, request)

  const accessToken = await ensureAccessToken(account)

  const jwt: string = await generateAccountToken({
    account_id: account.id,
    uid: String(accessToken.uid)
  })

  return h.response({

    user: account,

    accessToken: jwt

  }).code(201)

}

