import AuthenticatedRequest from '../../auth/AuthenticatedRequest';
import {models}  from '../../../lib';
import { ResponseToolkit } from '@hapi/hapi';

export async function index(request: AuthenticatedRequest, h: ResponseToolkit) {

  let coins = await models.Address.findAll({

    where: { account_id: request.account.id }

  })

  let settings = await models.WoocommerceSetting.findOne({

    where: {

      account_id: request.account.id
    }

  })

  if (!settings) {

    settings = {

      image_url: 'https://media.bitcoinfiles.org/65602243db575e3c275d6f12daff4c35860c26176f44ca88ff9d271d8201e686.jpeg'

    }
  }

  settings.coins = coins.map((coin: { currency: string}) => {

    return coin.currency
  });

  return { settings }

}

