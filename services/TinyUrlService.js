const { default: axios } = require("axios");

const redisService = require("../services/RedisService");
const { getDateMonthAndYear } = require("../utils/DateUtil");
const UserService = require("../services/UserService");

function createTinyUrl(url, email) {
  let tinyCode = generateTinyCode();
  let tryCounter = 0;
  const tinyUrlPayload = { originalUrl: url, email: email };
  while (
    !redisService.set(tinyCode, JSON.stringify(tinyUrlPayload)) &&
    tryCounter < process.env.MAX_RETRIES
  ) {
    tinyCode = generateTinyCode();
    tryCounter++;
  }

  if (tryCounter === process.env.MAX_RETRIES) {
    throw new Error("Space is full");
  }

  // save tinyCode in user document
  UserService.addTinyCodeToUser(email, tinyCode).catch((error) => {
    console.log("error saving tinyCode in user document: " + error.message);
  });

  return process.env.BASE_URL + tinyCode + "/";
}

async function addNewClick(tinyCode, email) {
  const STATISTICS_MICROSERVICE_URL = "http://localhost:8080/api/tinyClick";
  const body = { tinyCode: tinyCode, email };
  try {
    const response = await axios.post(STATISTICS_MICROSERVICE_URL, body);

    if (response.status === 200 && response.data !== null) {
      return response.data;
    }
    throw response;
    
    
  }catch (error) {
    console.log("cant add new click to tiny url: " + tinyCode);
    console.log("Axios error: " + error.message);
    
    
  }
}

function updateTotalClicks(email) {
  const STATISTICS_MICROSERVICE_URL = "http://localhost:8080/api/increment";
  const body = { email: email, key: "totalClicks", collectionName: "users" };

  axios
    .post(STATISTICS_MICROSERVICE_URL, body)
    .then((response) => {
      console.log(response.status);
      console.log("updated total clicks for user: " + email);
    })
    .catch((error) => {
      console.log(error.message);
      console.log("error updating total clicks for user: " + email);
    });
}

function updateDic(email, tinyCode) {
  const STATISTICS_MICROSERVICE_URL = "http://localhost:8080/api/incrementTiny";
  const body = {
    email: email,
    key: getDateMonthAndYear(),
    collectionName: "users",
    tinyCode: tinyCode,
  };

  axios
    .post(STATISTICS_MICROSERVICE_URL, body)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// TodDo refactor axios call -> duplicate code
function updateTinyUrlClicks(email, tinyCode) {
  const STATISTICS_MICROSERVICE_URL = "http://localhost:8080/api/increment";
  const body = {
    email: email,
    key: tinyCode + "_clicks_" + getDateMonthAndYear(),
    collectionName: "users",
  };

  axios
    .post(STATISTICS_MICROSERVICE_URL, body)
    .then((response) => {
      console.log(response.status);
      console.log("updated total clicks for user: " + email + " " + tinyCode);
    })
    .catch((error) => {
      console.log(error.message);
      console.log(
        "error updating total clicks for user: " + email + " " + tinyCode
      );
    });
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

const getAllClicks = async (email) => {
  const STATISTICS_MICROSERVICE_URL = `http://localhost:8080/api/tinyClicks/${email}`;

  try {
    const response = await axios.get(STATISTICS_MICROSERVICE_URL);
    if (response.status === 200 && response.data !== null) {
      return response.data;
    }
    throw response;
  } catch (error) {
    console.log("cant get all clicks for user: " + email);
    console.log("Axios error: " + error.message);
  }

};

module.exports = {
  createTinyUrl,
  getTinyUrl,
  updateTotalClicks,
  updateTinyUrlClicks,
  updateDic,
  addNewClick,
  getAllClicks,
};
