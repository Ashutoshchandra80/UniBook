const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const mongoClient = require("mongoose");
const passport = require("passport");
const User = require("./Models/User");
require("dotenv").config();

///app configs
const app = express();
const port = process.env.PORT || 9000;

///////// db  connectionn configs
const connection_url = process.env.MONGO_URL;

const conn = mongoClient.createConnection(connection_url, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
});

mongoClient.connect(
  connection_url,
  {
    // useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

const db = mongoClient.connection;
db.once("open", () => {
  console.log("DB connected");
});

/// middlewares
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } }));
const passportInit = require("./config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE");
  next();
});

//////////////////// API Routes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/", require("./routers/index"));
app.use("/user", require("./routers/user"));
app.use("/signup", require("./routers/signup"));
app.use("/login", require("./routers/login"));
app.use("/post", require("./routers/posts"));

///// get user by registration number

app.get("/user/:registration", async (req, res) => {
  const id = req.params.email;
  const pat = await User.findOne({ email: id });
  if (pat) {
    res.status(200).send(pat);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(port, () => console.log(` listening on localhost:${port}`));
