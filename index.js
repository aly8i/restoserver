const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const port = 5000
require('dotenv').config();
// app.use(
//   cors({
//     origin: `${process.env.CLIENT_URL}`,
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
//   })
// );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://resturantz.vercel.app/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.options("*", cors({ origin: '', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "https://resturantz.vercel.app/", optionsSuccessStatus: 200 }));

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
  res.send(`Welcome to the Resturant authentication server ! ${process.env.CLIENT_URL}`)
})
app.use("/auth", authRoute);

app.listen(process.env.PORT || port, () => {
  console.log("Server is running!");
});
