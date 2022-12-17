import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as ApplicationService from '../services/application.service'
import * as JobService from '../services/job.service'
import * as UserService from '../services/user.service'
import * as CompanyService from '../services/company.service'
import hogan from 'hogan.js';
import fs from 'fs';
import path from 'path'

const analyticsRouter = express.Router();

analyticsRouter.get(
  '/companies/:companyId',
  MDW.authenticate,
  MDW.authorize([EUserType.recruiter]),
  async (req, res, next) => {
    const companyId = req.params.companyId

    // jobs
    const jobs = await JobService.findMany({ companyId })

    // applications
    let applications = []
    for (const job of jobs) {
      const _applications = await ApplicationService.findMany({ jobId: job._id })

      applications = [..._applications, ...applications];
    }

    return res.status(200).json({
      jobs,
      applications
    })
  }
)


analyticsRouter.get(
  '/companies/:companyId/_csv_',
  // option 1: cloudinary => upload file csv to cloudinary => export url
  // option 2: modify http response, response csv file
)


export default analyticsRouter;