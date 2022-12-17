import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as JobSevice from '../services/job.service';

const jobRouter = express.Router();


jobRouter.get(
  '/',
  async (req, res, next) => {
    const data = await JobSevice.findMany({})
    _.set(req, 'result', data)
    next();
  },
  formatJsonApiCollection
)


/**
 * @todo create company
 */
jobRouter.post(
  '/',
  MDW.authenticate,
  MDW.authorize([EUserType.recruiter]),
  // MDW connection recruiter <=> company
  async (req, res, next) => {
    const data = req.body;
    data.recruiterId = _.get(req, 'user._id')
    const job = await JobSevice.create(data);

    _.set(req, 'result', job)
    next();
  },
  formatJsonApiResource
)



export default jobRouter;