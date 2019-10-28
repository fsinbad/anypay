#!/usr/bin/env ts-node

require('dotenv').config();

import { Op } from 'sequelize';

const yelp = require('yelp-fusion');
const client = yelp.client(process.env['YELP_API_KEY']);

const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);

import { models } from '../lib';

(async () => {

  let cities = await models.City.findAll({ where: {

    id: {
      [Op.gte]: 250
    }
  
  }});

  bar1.start(cities.length, 0);

  for (let i = 0; i < cities.length; i++) {

    let city = cities[i];

    console.log(city.toJSON())
    var businesses;

    try {

      businesses = await searchCityAll(`${city.name}, NH`);

    } catch(error) {

      console.error(error.message);

      continue;
    }

    console.log(`found ${businesses.length} businesses in ${city.name}`);

    var bar2 = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);

    bar2.start(businesses.length, 0);

    for (let j = 0; j < businesses.length; j++) {

      let business = businesses[j];

      let [record, isNew] = await importBusiness(city, business);

      if (isNew) {
        console.log(`businesscreated`, record.toJSON());
      }

      bar2.update(j);

    }

    bar1.update(i);

  }
})();

function importBusiness(city: any, businessJson: any): Promise<any> {

  //console.log(`importbusiness:${city.name}`, businessJson);

  return models.YelpBusiness.findOrCreate({

    where: {
      yelp_id: businessJson.id
    },

    defaults: {
      yelp_id: businessJson.id,
      city_id: city.id,
      json_string: JSON.stringify(businessJson),
      alias: businessJson.alias,
      image_url: businessJson.image_url,
      url: businessJson.url,
      latitude: businessJson.location.latitude,
      longitude: businessJson.location.longitude,
      phone: businessJson.location.phone
    }

  });

}

async function searchCityAll(city): Promise<any> {

  var offset = 0;

  var latestResponse = [1];

  var businesses = [];

  while (latestResponse.length > 0) {

    latestResponse = await searchCity(city, offset);

    offset += 50

    businesses = businesses.concat(latestResponse);

  }

  return businesses;

}


function searchCity(city, offset = 0): Promise<any> {

  return new Promise((resolve, reject) => {

    client.search({
      location: city,
      limit: 50,
      offset
    }).then(response => {

      resolve(response.jsonBody.businesses);

    }).catch(e => {

      reject(e);
    });

  });

}
