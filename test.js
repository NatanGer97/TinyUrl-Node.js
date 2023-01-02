const redisClient = require("redis").createClient();

redisClient.connect()
.then(() => {
    console.log('Redis connected');
    redisClient.setNX("key", "value").then((res) => {
        console.log("set: " + typeof res);
    });
    
    redisClient.get("key").then((res) => {
        console.log(res);
    });
  
});

