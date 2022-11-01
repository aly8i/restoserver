const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const port = 5000
require('dotenv').config();
// app.use(cors());
var corsOptions = {
  origin: 'https://resturantz.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
  res.send(`Welcome to the Resturant authentication server ! ${process.env.CLIENT_URL}`)
})
app.use("/auth", cors(corsOptions), authRoute);

app.listen(process.env.PORT || port, () => {
  console.log("Server is running!");
});
