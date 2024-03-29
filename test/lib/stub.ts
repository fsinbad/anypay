require('dotenv').config()

import * as assert from 'assert' 
import * as stub from '../../lib/stub'

import * as utils from '../utils'
import prisma from '../../lib/prisma'

describe("Adding a stub to an account", () => {

  it("should use the business name by default", () => {

    var accountStub = stub.build({ business_name: 'La Carreta' })

    assert.strictEqual(accountStub, 'la-carreta')

    accountStub = stub.build({
      business_name: 'La Carreta',
      city: 'Portsmouth'
    })

    assert.strictEqual(accountStub, 'la-carreta-portsmouth')

  })

  it("should automatically update the stub on the model", async () => {

    let account = await utils.generateAccount()

    account.business_name = "Jason's Deli"

    await prisma.accounts.update({
      where: {
        id: account.id
      },
      data: {
        business_name: "Jason's Deli",
        updatedAt: new Date()
      }
    })

    assert.strictEqual(account.stub, 'jasons-deli')

    await prisma.accounts.delete({
      where: {
        id: account.id        
      }
    })

  })

  it("should prevent saving the stub if one with that stub already exists", async () => {

    let account1 = await utils.generateAccount()
    let account2 = await utils.generateAccount()

    account1.business_name = "HEB Supermarket"
    account2.business_name = "HEB Supermarket"

    await prisma.accounts.update({
      where: {
        id: account1.id
      },
      data: {
        business_name: "HEB Supermarket",
        updatedAt: new Date()
      }
    })

    assert.strictEqual(account1.stub, 'heb-supermarket')

    await prisma.accounts.update({
      where: {
        id: account2.id
      },
      data: {
        business_name: "HEB Supermarket",
        updatedAt: new Date()
      }
    })

    assert.strictEqual(account2.stub, null)

    await prisma.accounts.delete({
      where: {
        id: account1.id
      }
    })

    await prisma.accounts.delete({
      where: {
        id: account2.id
      }
    })

  })

  it("should try to use the city in case of a conflict", async () => {

    let account1 = await utils.generateAccount()
    let account2 = await utils.generateAccount()

    account1.business_name = "HEB Supermarket"

    account2.business_name = "HEB Supermarket"
    account2.city = "San Antonio"

    await prisma.accounts.update({
      where: {
        id: account1.id
      },
      data: {
        business_name: "HEB Supermarket",
        updatedAt: new Date()
      }
    })

    assert.strictEqual(account1.stub, 'heb-supermarket')

    await prisma.accounts.update({
      where: {
        id: account2.id
      },
      data: {
        business_name: "HEB Supermarket",
        city: "San Antonio",
        updatedAt: new Date()
      }
    })

    assert.strictEqual(account2.stub, 'heb-supermarket-san-antonio')

    await prisma.accounts.delete({
      where: {
        id: account1.id
      }
    })

    await prisma.accounts.delete({
      where: {
        id: account2.id
      }
    })

  })

})
