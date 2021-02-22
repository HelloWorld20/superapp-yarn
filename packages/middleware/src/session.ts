import * as session from "express-session";
import * as connectRedis from "connect-redis";

import * as config from "ww-config";
const sessionConfig = config.get("session");
const redisConf = config.get("redis.session");

const redis = require("redis");

console.log('redisConf', redisConf)

const client = redis.createClient({
  port: redisConf.server.port,
  host: redisConf.server.host,
  password: redisConf.server.password
});

// TODO: 消除any
const RedisStore = connectRedis(session as any);

export const createSession = function() {
  const redisStore = new RedisStore({ client });
  return session({ ...sessionConfig, store: redisStore });
};
