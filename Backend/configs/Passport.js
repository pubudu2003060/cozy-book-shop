import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";
import dotenv from "dotenv";

dotenv.configDotenv();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user || null);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase() || null;

        let user = await User.findOne({ googleId: profile.id });
        if (!user && email) {
          user = await User.findOne({ email });
          if (user) return done(null, null);
        }

        if (!user) {
          const newCart = new Cart();
          await newCart.save();
          user = await User.create({
            googleId: profile.id,
            email,
            name: profile.displayName,
            cartId: newCart._id,
          });
          return done(null, user);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
