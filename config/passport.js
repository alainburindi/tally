import bcrypt from "bcrypt";
import local from "passport-local";
import { User } from "../models";

const LocalStrategy = local.Strategy;

const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //check if email exists
        const user = await User.findByEmail(email);

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isValid = bcrypt.compareSync(password, result[0].password);
        if (isValid) {
          return done(null, result[0]);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const result = await User.findOne({
      where: { id },
    });
    return done(null, result);
  });
};

export default passportConfig;
