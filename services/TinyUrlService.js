const redisService = require("../services/RedisService");
const redisClient = require("redis").createClient();

function createTinyUrl(url) {
  let tinyCode = generateTinyCode();
  let tryCounter = 0;

  while (
    !redisService.set(tinyCode, url) &&
    tryCounter < process.env.MAX_RETRIES
  ) {
    tinyCode = generateTinyCode();
    tryCounter++;
  }
  if (tryCounter === process.env.MAX_RETRIES) {
    throw new Error("Space is full");
  }

  return process.env.BASE_URL + tinyCode + "/";
}

function generateTinyCode() {
  const CHARS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const CODE_LENGTH = 4;
  let tinyCode = [];

  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * CHARS.length);
    const randomChar = CHARS[randomIndex];
    tinyCode.push(randomChar);
  }

  return tinyCode.join("");
}

function getTinyUrl(tinyCode) {
  return redisService.get(tinyCode);
}

module.exports = { createTinyUrl, getTinyUrl };
