const router = require("express").Router();
const passport = require("passport");
var cookie = require('cookie');
require('dotenv').config();
// const express = require('express');
// const { requireSignin, userMiddleware } = require("../common-middleware");
const {loginFail,loginSuccess} = require("../functions")
router.get("/login/success",  loginSuccess);

router.get("/login/failed", loginFail);

router.get("/logout", (req, res) => {
  req.logout();
  res.setHeader("Set-Cookie",cookie.serialize("accessToken", "", {
    maxAge: -1,
    sameSite: "strict",
    httpOnly: true,
    path: "/",
  })
);
  res.redirect(process.env.CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback",passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router