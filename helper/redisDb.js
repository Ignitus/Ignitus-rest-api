const redisDb = require('redis');

const client = redisDb.createClient();

const redis = {
  connected: true,
  get: key => new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err != null) reject(err);
      else resolve(JSON.parse(reply));
    });
  }),
  put: (key, value) => new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(value), (err, reply) => {
      if (err != null) reject(err);
      else resolve(reply);
    });
  }),
  delete: key => new Promise((resolve, reject) => {
    client.del(key, (err, reply) => {
      if (err != null) reject(err);
      else resolve(reply);
    });
  }),
  flush: key => new Promise((resolve, reject) => {
    client.flushdb((err, reply) => {
      if (err != null) reject(err);
      else resolve(reply);
    });
  }),
};

client.on('error', (msg) => {
  if (msg.errno == 'ECONNREFUSED') {
    redis.connected = false;
  }
  client.quit();
});

module.exports = redis;
