const redisClient = require("redis").createClient();

exports.set = async (key, value) => {
  try {
    await redisClient.connect();
    const res = await redisClient.setNX(key, value);
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    redisClient.disconnect();
  }
};

exports.get = async (key) => {
  try {
    await redisClient.connect();
    const value = await redisClient.get(key);
    return value;
  } catch (error) {
    console.log(error);
  } finally {
    redisClient.disconnect();
  }
};

exports.isExist = async (key) => {
  try {
    const value = await redisClient.exists(key);

    if (parseInt(value) === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
