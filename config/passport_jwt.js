const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Doctor = require("../models/doctor");

// Creating object for Extracting payload data.
let obj = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "vltrY2q0kTHIkGcNuvKu", //secret key used to encrypt/decrypt
};

// Defining new JWT startergy by simply comparing if the id of doctor from payload is present in database or not.
passport.use(
  new JWTStrategy(obj, function (jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function (err, doctor) {
      if (err) {
        //In case of error
        console.log("Error in finding user --> Passport JWT");
        return done(err);
      }
      if (doctor) {
        //Doctor found
        return done(null, doctor);
      } else {
        //Doctor not found
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
