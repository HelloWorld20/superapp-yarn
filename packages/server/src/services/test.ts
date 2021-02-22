import Redis from "ww-utils-server/src/redis";
import * as config from "ww-config";
import * as db_test from "../db/test";

const redisConfig = config.get("redis.app");
const redisIns = new Redis(redisConfig);

export async function getRedis(key: string) {
  return redisIns.get(key);
}

export async function setRedis(key: string, value: string) {
  redisIns.set(key, value);
  return value;
}
///////////////////////////////////
export async function getMongo(condition: Record<string, any>) {
  return db_test.find(condition);
}

export async function addMongo(age: string, name: string) {
  db_test.insert({ age, name });
  return name;
}

export async function delMongo(condition: Record<string, any>) {
  return db_test.del(condition);
}

export async function updateMongo(
  condition: Record<string, any>,
  value: Record<string, any>
) {
  condition.age = Number(condition.age);
  return db_test.update(condition, value);
}
