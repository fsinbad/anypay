
import { log } from '../../../lib/log'

import * as links from '../../../lib/linked_accounts'

import { index as list_account_payments_handler } from './payments'
import AuthenticatedRequest from '../../../server/auth/AuthenticatedRequest'
import { ResponseToolkit } from '@hapi/hapi'
import { unauthorized } from '@hapi/boom'
import prisma from '../../../lib/prisma'

export async function index(request: AuthenticatedRequest, h: ResponseToolkit) {

  try {

    const source = request.params.account_id

    const target = request.account.id

    log.info('api.v1.linked_accounts.index', {
      source,
      target
    })

    let link = await links.getLink({ source, target })

    if (!link) {

      return unauthorized()

    }

    request.account = await prisma.accounts.findFirstOrThrow({
      where: {
        id: source
      }  
    })

    delete request.params['account_id']

    return list_account_payments_handler(request, h)

  }  catch(error: any) {

    log.error('api.v1.linked_accounts.index', error)

    return unauthorized()
    //return h.badRequest(error)

  }

}

