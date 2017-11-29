const Hapi = require("hapi");
const amqp = require("amqplib");
const log = require("winston");

const AMQP_URL = "amqp://blockcypher.anypay.global";
const BITCOIN_QUEUE = "blockcypher:bitcoin:webhooks";
const LITECOIN_QUEUE = "blockcypher:litecoin:webhooks";
const DASH_QUEUE = "blockcypher:dash:webhooks";

const server = new Hapi.Server();

server.connection({
  host: "0.0.0.0",
  port: process.env.PORT || 8000
});

amqp
  .connect(AMQP_URL)
  .then(conn => {
    log.info("amqp:connected", AMQP_URL);

    conn.on("error", error => {
      log.error("amqp:connection:error", error);
      process.exit(1);
    });

    conn.on("close", () => {
      log.error("amqp:connection:closed");
      process.exit(1);
    });

    return conn.createChannel().then(channel => {
      log.info("amqp:channel:created");

      channel.on("error", error => {
        log.error("amqp:channel:error", error);
        process.exit(1);
      });

      channel.on("close", () => {
        log.error("amqp:channel:closed");
        process.exit(1);
      });

      server.route({
        method: "POST",
        path: "/bitcoin/webhooks",
        handler: function(request, reply) {
          log.info("bitcoin:blockcypher:callback", request.payload);

          let message = JSON.stringify(request.payload);

          let sent = channel.sendToQueue(BITCOIN_QUEUE, new Buffer(message));

          if (!sent) {
            log.error("amqp:send:error", message);
            reply().code(500);
          } else {
            log.info("amqp:sent", message);
            reply();
          }
        }
      });

      server.route({
        method: "POST",
        path: "/litecoin/webhooks",
        handler: function(request, reply) {
          log.info("litecoin:blockcypher:callback", request.payload);

          let message = JSON.stringify(request.payload);

          let sent = channel.sendToQueue(LITECOIN_QUEUE, new Buffer(message));

          if (!sent) {
            log.error("amqp:send:error", message);
            reply().code(500);
          } else {
            log.info("amqp:sent", message);
            reply();
          }
        }
      });

      server.route({
        method: "POST",
        path: "/dash/webhooks",
        handler: function(request, reply) {
          log.info("dash:blockcypher:callback", request.payload);

          let message = JSON.stringify(request.payload);

          let sent = channel.sendToQueue(DASH_QUEUE, new Buffer(message));

          if (!sent) {
            log.error("amqp:send:error", message);
            reply().code(500);
          } else {
            log.info("amqp:sent", message);
            reply();
          }
        }
      });

      channel
        .assertQueue(BITCOIN_QUEUE, { durable: true })
        .then(() => {
          log.info("amqp:bitcoin_queue:asserted", QUEUE);
          return channel.assertQueue(DASH_QUEUE, { durable: true });
        })
        .then(() => {
          log.info("amqp:dash_queue:asserted", QUEUE);

          server.start(err => {
            if (err) {
              throw err;
            }
            log.info("server:started", server.info.uri);
          });
        });
    });
  })
  .catch(log.error);

