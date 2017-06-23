"use strict";

const Hapi = require("hapi");
const Invoice = require("../../lib/models/invoice");
const AccessToken = require("../../lib/models/access_token");
const Account = require("../../lib/models/account");
const AccountLogin = require("../../lib/account_login");
const sequelize = require("../../lib/database");
const EventEmitter = require("events").EventEmitter;
const DashCore = require("../../lib/dashcore");
const Blockcypher = require("../../lib/blockcypher");
const DashInvoice = require("../../lib/dash_invoice");
const Basic = require("hapi-auth-basic");
const bcrypt = require("bcrypt");
const owasp = require('owasp-password-strength-test');

const WebhookHandler = new EventEmitter();

WebhookHandler.on("webhook", payload => {
  console.log("payload", payload);
});

const server = new Hapi.Server();
server.connection({
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 8000,
  routes: {
    cors: true
  }
});

const validatePassword = function(request, username, password, callback) {

  if (!username || !password) {
    return callback(null, false);
  }

	AccountLogin.withEmailPassword(username, password)
		.then(accessToken => {
      return callback(null, true, { accessToken });
		})
		.catch(error => {
        return callback(error, false);
		});
}

const validateToken = function(request, username, password, callback) {
  if (!username) {
    return callback(null, false);
  }

  AccessToken.findOne({
    where: {
      uid: username
    }
  })
    .then(accessToken => {
      if (accessToken) {
        return callback(null, true, { accessToken: accessToken });
      } else {
        return callback(null, false);
      }
    })
    .catch(callback);
};

server.register(Basic, err => {
  if (err) {
    throw err;
  }

  server.auth.strategy("token", "basic", { validateFunc: validateToken });
  server.auth.strategy("password", "basic", { validateFunc: validatePassword });

  server.route({
    method: "GET",
    path: "/invoices/{invoice_id}",
    handler: function(request, reply) {

      Invoice.findOne({
        where: {
          uid: request.params.invoice_id
        }
      })
        .then(invoice => {
          if (invoice) {
            reply(invoice);
          } else {
            reply().code(404);
          }
        })
        .catch(error => reply({ error }).code(500));
    }
  });

  server.route({
    method: "POST",
    path: "/invoices",
    config: {
      auth: "token",
      handler: function(request, reply) {

        DashInvoice.generate({
          dash_amount: request.payload.amount,
          account_id: request.auth.credentials.accessToken.account_id
        })
          .then(invoice => {
            console.log("generated dash invoice", invoice);
            reply(invoice);
          })
          .catch(error => {
            console.error("error generating invoice", error);
            reply({ error }).code(500);
          });
      }
    }
  });

  server.route({
    method: "POST",
    path: "/accounts",
    handler: (request, reply) => {

			bcrypt.hash(request.payload.password, 10, (error, hash) => {

        Account.create({
          email: request.payload.email,
          password_hash: hash
        })
        .then(account => {
          reply(account);
        })
        .catch(error => {
          reply({ error: error }).code(500);
        });
			})
    }
  });

  server.route({
    method: "GET",
    path: "/accounts/:account_uid/confirmation",
    handler: (request, reply) => {
      // email confirmation link
    }
  });

  server.route({
    method: "POST",
    path: "/access_tokens",
    config: {
      auth: "password",
      handler: (request, reply) => {

        reply(request.auth.credentials.accessToken);
      }
	  }
  });
});

if (require.main === module) {
  // main module, sync database & start server
  sequelize.sync().then(() => {
    // Start the server
    server.start(err => {
      if (err) {
        throw err;
      }
      console.log("Server running at:", server.info.uri);
    });
  });
} else {
  // module is required, export server
  module.exports = server;
}
