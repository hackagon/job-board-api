import express from 'express';
import _ from 'lodash'
import { formatJsonApiCollection, formatJsonApiResource } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as CompanyService from '../services/company.service'
import { uploadFile } from '../adapters/cloudinary';
import CompanyModel from '../models/company.model';
import fs from 'fs'; // built-in nodejs

const companyRouter = express.Router();

/**
 * @todo  upload logo
 * @notes company 1 <=> recruiter 1.1, 1.2
 * @notes company 2 <=> recruiter 2.1, 2.2
 */
companyRouter.patch(
  '/:companyId/_upload_',
  MDW.authenticate,
  MDW.authorize([EUserType.recruiter]),
  // MDW.connection (verify recruiter <=> company)
  MDW.upload.single('logo'),
  async (req, res, next) => {
    const filePath = req.file.path

    // cloudinary
    const cloudinaryResponse = await uploadFile(filePath)

    // empty file
    fs.unlinkSync(filePath)

    const company = await CompanyModel.findById(req.params.companyId)
    if (!company) return res.status(404).json({ mesasge: 'Company Not Found' })
    company.logoUrl = cloudinaryResponse.url;
    await company.save()

    _.set(req, 'result', company)
    next();
  },
  formatJsonApiResource
)

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

/**
 * @todo get company detail
 */

/**
 * @todo update company
 */
companyRouter.patch('/:companyId')



/**
 * @todo delete company
 */

export default companyRouter;