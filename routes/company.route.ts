import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import CompanyModel from '../models/company';

const companyRouter = express.Router();

companyRouter.get('', (req, res, next) => {
  console.log("kdnfdnfjk");

})


/**
 * @todo create company
 */
companyRouter.post(
  '/',
  MDW.authenticate,
  MDW.authorize([EUserType.recruiter]),
  async (req, res, next) => {

    const data = req.body;
    const company = await CompanyModel.create(data);


    _.set(req, 'result', company)
    next();
  },
  formatJsonApiResource
)

export default companyRouter;