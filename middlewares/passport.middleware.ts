import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserModel, { } from '../models/user.model'

export const applyPassport = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mk98mb2RAZn^78tV!bok',
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findOne({ email: jwtPayload.email })
      .then(user => {
        if (user) return done(null, user)
        return done(null, false)
      })
      .catch(err => {
        return done(err, false)
      })
  }));
}

