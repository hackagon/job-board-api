import JobModel, { IJob } from "../models/job.model";
import _ from 'lodash'
import { formatResource } from "../utils/json_api_formatter";

export const create = async (data: any): Promise<IJob> => {
  return JobModel.create(data);
}

export const findMany = async (data: any): Promise<Array<IJob>> => {
  const jobs = await JobModel.find({})
    .populate('companyId')

  return _.map(jobs, job => {
    if (!job.companyId) return job

    _.set(job, '_doc.relationships.company', formatResource(job.companyId))
    _.set(job, '_doc.companyId', job.companyId._id)
    return job;
  })
}

// export const uploadPdf