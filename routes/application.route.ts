import express from 'express';
import _ from 'lodash'
import { formatJsonApiResource, formatJsonApiCollection } from '../utils/json_api_formatter';
import * as MDW from '../middlewares';
import { EUserType } from '../interfaces';

const applicationRouter = express.Router();

/**
 * @todo apply CV
 * @input candidateId, jobId
 * @output  application instance
 * @output  email notification => recruiter
 */



export default applicationRouter;
