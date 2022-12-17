import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';
import * as ApplicationService from '../services/application.service'
import * as JobService from '../services/job.service'
import * as UserService from '../services/user.service'
import * as CompanyService from '../services/company.service'
// import { sendEmail } from '../adapters/mailgun';
import hogan from 'hogan.js';
import fs from 'fs';
import path from 'path'

const applicationRouter = express.Router();

/**
 * @todo apply CV
 * @input candidateId, jobId
 * @output  application instance
 * @output  email notification => recruiter
 */
applicationRouter.post(
  '/',
  MDW.authenticate,
  MDW.authorize([EUserType.candidate]),
  // MDW validation,
  async (req, res, next) => {
    const candidateId = _.get(req, 'user._id');
    const jobId = req.body.jobId;

    // candidate instance
    const application = await ApplicationService.create({ candidateId, jobId })
    const job = await JobService.findById(jobId);
    const recruiter = await UserService.findById(job.recruiterId)
    const company = await CompanyService.findById(job.companyId);

    // send email to recruiter
    // sendEmail({
    //   to: recruiter.email,
    //   subject: 'New application',
    //   html: '<p>New application</p>'
    // })

    // // send email to candidate
    // // fullName, jobTitle, companyName
    // const templatePath = path.join(__dirname, '..', '..', 'templates/template-1.hbs')
    // const template = fs.readFileSync(templatePath, 'utf-8');
    // const compiledTemplate = hogan.compile(template);

    // sendEmail({
    //   to: _.get(req, 'user.email'),
    //   subject: `[JobBoard] Xác nhận ứng tuyển thành công vị trí ${job.title}`,
    //   html: compiledTemplate.render({
    //     fullName: _.get(req, 'user.lastName') + " " + _.get(req, 'user.firstName'),
    //     jobTitle: job.title,
    //     companyName: company.name
    //   })
    // })

    // response data
    _.set(req, 'result', application)
    next()
  },
  formatJsonApiResource
)


export default applicationRouter;
