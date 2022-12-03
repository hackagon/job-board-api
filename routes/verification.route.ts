import express from 'express';
import _ from 'lodash'
import UserModel from '../models/user.model';
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/json_api_formatter';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'
import VerificationModel from '../models/verification.model';
import * as VerificationService from '../services/verification.service'

const verificationRouter = express.Router();


verificationRouter.post(
  '/login',
  async (req, res, next) => {
    return VerificationService.login(req.body)
      .then(verification => {
        _.set(req, 'result', verification)
        next();
      })
      .catch(err => {
        return res
          .status(err.status ? err.status : 500)
          .json({
            message: err.message ? err.message : "Internal Server Error"
          })
      })
  },
  formatJsonApiResource
)



export default verificationRouter;