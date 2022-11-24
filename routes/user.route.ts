import express from 'express';
import * as UserValidation from '../validation/user';
import * as UserService from '../services/user.service'
import _ from 'lodash'
import { formatJsonApiResource } from '../utils/json_api_formatter';

const userRouter = express.Router();

/**
 * @todo Get list of users
 */
userRouter.get(
  '/users',
  async (req, res, next) => {
    const users = await UserService.findMany();
    return res.json({
      data: users
    })
  })

/**
 * @todo Create user
 */
userRouter.post(
  '/users',
  UserValidation.validateCreateUser,
  async (req, res, next) => {
    const data = req.body;
    const result = await UserService.create(data);

    _.set(req, 'result', result)
    next();
  },
  formatJsonApiResource
)

/**
 * @todo Update user
 */

/**
 * @todo Replace user
 */

/**
 * @todo Delete user
 */

/**
 * @todo Get user by id
 */

export default userRouter;