const redisDb = require('redis');

const client = redisDb.createClient();

client.on("error", (msg) => {
    if (msg.errno == 'ECONNREFUSED')
    {
        redis.connected = false;
    }
    client.quit();
});

const redis = {
    connected: true,
    get: (key) => {
        return new Promise((resolve, reject) => {
            client.get(key, function (err, reply) {
                if (err != null) reject(err);
                else resolve(JSON.parse(reply));
            });
        });
    },
    put: (key, value) => {
        return new Promise((resolve, reject) => {
            client.set(key, JSON.stringify(value), function (err, reply) {
                if (err != null) reject(err);
                else resolve(reply);
            });
        });
    },
    delete: (key) => {
        return new Promise((resolve, reject) => {
            client.del(key, function (err, reply) {
                if (err != null) reject(err);
                else resolve(reply);
            });
        });
    },
    flush: (key) => {
        return new Promise((resolve, reject) => {
            client.flushdb(function (err, reply) {
                if (err != null) reject(err);
                else resolve(reply);
            });
        });
    }
}

module.exports = redis;
