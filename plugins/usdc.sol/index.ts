
import { Plugin, BroadcastTxResult, Transaction } from '../../lib/plugin'

//TODO: FinishPluginImplementation

export default class USDC_SOL extends Plugin {

  chain = 'SOL'

  currency = 'USDC'

  token = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

  async broadcastTx(txhex: string): Promise<BroadcastTxResult> {

    throw new Error()

  }

  async getTransaction(txid: string): Promise<Transaction> {

    throw new Error()

  }

  async validateAddress(address: string) {

    return false

  }

  async verifyPayment(params) {

    return false

  }

}

