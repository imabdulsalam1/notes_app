const express = require("express");
const router = express.Router();
const passport = require("passport");
const { route } = require(".");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
    }
  )
);

//Google login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login_failure",
    successRedirect: "/dashboard",
  })
);

// login failure
router.get("/login_failure", (req, res) => {
  res.send("Something is wrong...");
});

module.exports = router;
