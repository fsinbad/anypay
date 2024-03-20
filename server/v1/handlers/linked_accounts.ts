
import { ResponseToolkit } from '@hapi/hapi'
import * as links from '../../../lib/linked_accounts'

import { log } from '../../../lib/log'
import AuthenticatedRequest from '../../../server/auth/AuthenticatedRequest'
import { badRequest } from '@hapi/boom'

export async function index(request: AuthenticatedRequest, h: ResponseToolkit) {

  try {

    log.info('api.v1.linked_accounts.index', {
      ...request.query,
      account_id: request.account.id
    })

    const linked_accounts = await links.listLinkedAccounts(request.account, request.query)

    return h.response({
      linked_accounts
    })
    .code(200)

  }  catch(error: any) {

    log.error('api.v1.linked_accounts.index', error)

    return badRequest(error)

  }

}

export async function create(request: AuthenticatedRequest, h: ResponseToolkit) {

  try {

    const payload = request.payload as {
      provider: string,
      access_token: string,
      refresh_token: string,
      expires_at: string;
      email: string;
    }

    log.info('api.v1.linked_accounts.create', {
      ...payload,
      account_id: request.account.id
    })

    const linked_account = await links.linkAccount(request.account, payload)

    return h.response({
      linked_account
    })
    .code(201)

  }  catch(error: any) {

    log.error('api.v1.linked_accounts.create', error)

    return badRequest(error)

  }

}

export async function unlink(request: AuthenticatedRequest, h: ResponseToolkit) {

  const payload = request.payload as {
    provider: string
  }

  const params = request.params as {
    id: string
  } 

  try {

    log.info('api.v1.linked_accounts.unlink', {
      payload,
      account_id: request.account.id
    })

    await links.unlinkAccount(request.account, params)

    return h.response({
      success: true
    })
    .code(200)

  } catch(error: any) {

    log.error('api.v1.linked_accounts.unlink', error)

    return badRequest(error)

  }

}


