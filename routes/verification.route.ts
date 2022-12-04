import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource } from '../utils/json_api_formatter';
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