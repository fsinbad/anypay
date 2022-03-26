
import * as utils from '../../utils'

import { expect, server } from '../../utils'

import { Invoice } from '../../../lib/invoices'

import { listInvoiceEvents } from '../../../lib/events'

describe('Integration | Accounts', () => {

  describe("Listing Events Related To Account", () => {

    it('gets the account events list from the API', async () => {

      let account = await utils.createAccount()

      let response = await utils.authRequest(account, {
        method: 'GET',
        url: `/v1/api/account/events`
      })
      
      expect(response.statusCode).to.be.equal(200)

      expect(response.result.events).to.be.an('array')

      expect(response.result.events[0].type).to.be.equal('account.created')

      expect(response.result.events[0].account_id).to.be.equal(account.id)

    })


    it('gets the account events list from the API in order', async () => {

      let [account, invoice] = await utils.newAccountWithInvoice()


      var order = 'asc'

      var response = await utils.authRequest(account, {
        method: 'GET',
        url: `/v1/api/account/events?order=${order}`
      })

      var [event1, event2] = response.result.events

      expect(event2.id).to.be.greaterThan(event1.id)

      order = 'desc'

      var response = await utils.authRequest(account, {
        method: 'GET',
        url: `/v1/api/account/events?order=${order}`
      })

      var [event3, event4] = response.result.events

      expect(event3.id).to.be.greaterThan(event4.id)

    })

  })

  describe("Getting Invoice Data", () => {

    it.skip("should have notes attached once they are created")

  })

  describe("Managing, Cancelling Invoice", () => {

  })

})
