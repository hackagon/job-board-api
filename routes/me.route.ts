import express from 'express';
import * as UserService from '../services/user.service'
import _ from 'lodash'
import { formatJsonApiResource } from '../utils/json_api_formatter';
import passport from 'passport';
import { authenticate } from '../middlewares/authentication.middleware';

const meRouter = express.Router();

/**
 * @todo get me
 */
meRouter.get(
  '/me',
  authenticate,
  // passport.authenticate('jwt', { session: true }),
  (req, res, next) => {
    _.set(req, 'result', req.user)
    next()
  },
  formatJsonApiResource
)

/**
 * @todo update password
 */
meRouter.patch(
  '/me/update-password',
  authenticate,
  // passport.authenticate('jwt', { session: true }),
  async (req, res, next) => {
    const data = req.body; // oldPassword, newPassword, newPassword2
    data.userId = _.get(req, "user._id");
    const result = await UserService.updatePassword(data)

    _.set(req, 'result', result)
    next();
  },
  formatJsonApiResource
)

export default meRouter;

/**
 * @todo update user/profile
 */