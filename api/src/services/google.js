import passport from "passport";
import config from "config";
import User from "../db/models/user";

import winston from "../utils/logger/winston";

const GoogleTokenStrategy = require("passport-google-token").Strategy;

const getProfile = (profile) => {
  const { id, displayName, emails, provider, _json } = profile;
  const { locale, picture } = _json;
  const deafultRole = "user";

  if (emails?.length) {
    const email = emails[0].value;
    return {
      name: displayName,
      email,
      provider,
      providerId: id,
      locale,
      picture,
      role: deafultRole,
    };
  }
  return null;
};

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.get("auth.google.client_id"),
      clientSecret: config.get("auth.google.client_secret"),
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingGoogleAccount = await User.findOne({
          providerId: profile.id,
        });

        if (!existingGoogleAccount) {
          const existingEmailAccount = await User.findOne({
            email: getProfile(profile).email,
          });

          if (!existingEmailAccount) {
            const { name, email, provider, providerId, locale, picture, role } =
              getProfile(profile);
            winston.debug(`Google id: ${providerId}`);
            const createdUser = new User({
              name,
              email,
              provider,
              providerId,
              locale,
              picture,
              role,
            });
            const newAccount = await createdUser.save();
            return done(null, newAccount);
          }
          return done(null, existingEmailAccount);
        }
        return done(null, existingGoogleAccount);
      } catch (error) {
        throw new Error(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => done(error));
});
