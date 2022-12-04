import express from 'express';
import _ from 'lodash'
import { formatJsonApiCollection, formatJsonApiResource } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as CompanyService from '../services/company.service'

const companyRouter = express.Router();

companyRouter.get(
  '/',
  async (req, res, next) => {
    const data = await CompanyService.findMany({ isActive: true })
    _.set(req, 'result', data)
    next();
  },
  formatJsonApiCollection
)


/**
 * @todo create company
 */
companyRouter.post(
  '/',
  MDW.authenticate,
  MDW.authorize([EUserType.recruiter]),
  async (req, res, next) => {

    const data = req.body;
    const company = await CompanyService.create(data);

    _.set(req, 'result', company)
    next();
  },
  formatJsonApiResource
)

export default companyRouter;