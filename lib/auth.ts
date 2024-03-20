require("dotenv").config()

import { log } from './log';

import { verifyToken } from './jwt'

import { compare } from './bcrypt'
import { Request, ResponseToolkit } from '@hapi/hapi';
import prisma from './prisma';
import AuthenticatedRequest from '../server/auth/AuthenticatedRequest'

import { accounts as Account } from '@prisma/client';

export async function validateSudoPassword(request: Request, username: string, password: string, h: ResponseToolkit) {

  log.info('validate sudo password');

  if (!username) {

    return {

      isValid: false

    }

  }

  try {

    await compare(username, String(process.env.SUDO_PASSWORD_HASH));

    return {

      isValid: true,

      credentials: {

        admin: true

      }

    }

  } catch(error: any) {

    log.error('auth.sudo.error', error);

    return {

      isValid: false

    }


  }

}



export async function validateToken(request: AuthenticatedRequest, username: string, password: string) {

  if (!username) {
    return {
      isValid: false
    };
  }

  let accessToken = await prisma.access_tokens.findFirst({
    where: {
      uid: username
    }
  });

  if (accessToken) {
    const account = await prisma.accounts.findFirstOrThrow({
      where: {
        id: accessToken.account_id
      }
    })

		request.account = account;

    request.account_id = accessToken.account_id;

    return {
      isValid: true,
      credentials: { accessToken: accessToken }
    }
  } else {

      return {

        isValid: false

      }

    }

};

export async function authorizeAccount(token: string): Promise<Account> {

  let verified = await verifyToken(token)

  return prisma.accounts.findFirstOrThrow({
    where: {
      id: verified.account_id
    }
  })

}

