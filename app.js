const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tinyUrlRouter = require("./routes/tinyUrl");
const authRouter = require("./routes/auth");
const errorHandler = require("./middlewares/ErrorHandler");
var options = {
  explorer: true,
};

const verifyJWT = require("./middlewares/auth/verifyJWT");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected!"));

/*    // Connect to MySQL
   mySqlConnection.connect((err) => {
      if (err) throw err;
      console.log('MySql Connected!');
   });


  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 
sequelize.sync().then(() => {
   console.log('table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
}); */

/*   const sequelize = new Sequelize(
    'tinyurl',
    'root',
    'root',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );  
  sequelize.authenticate().then(() => {
     console.log('Connection has been established successfully.');
  }).catch((error) => {
     console.error('Unable to connect to the database: ', error);
  }); */

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use(verifyJWT);
app.use("/users", usersRouter);
app.use("/tinyurl", tinyUrlRouter);

app.use(errorHandler);

app.all("*", (req, res) => {
  return res.status(404).send("Page not found");
});

module.exports = app;
