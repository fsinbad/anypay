
//import { plugins } from '../../../lib/plugins'

import AuthenticatedRequest from '../../auth/AuthenticatedRequest'
import { log } from '../../../lib'

import { badRequest } from '@hapi/boom'
import { ResponseToolkit } from '@hapi/hapi'

// broadcast transaction

export async function create(request: AuthenticatedRequest, h: ResponseToolkit) {

  try {
    //const { chain, currency, transaction } = req.payload

    //let plugin = plugins.find({ chain, currency })

    //let result = await plugin.broadcastTx({ txhex: transaction })

    //return { result }
    return {  }

  } catch(error: any) {

    log.error('server.v1.handlers.transactions.create', error)

    return badRequest(error)

  }

}
