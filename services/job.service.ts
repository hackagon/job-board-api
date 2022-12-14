import JobModel, { IJob } from "../models/job.model";
import _ from 'lodash'
import { formatResource } from "../utils/json_api_formatter";
import { Types } from "mongoose";

export const create = async (data: any): Promise<IJob> => {
  return JobModel.create(data);
}

export const findMany = async (data: any): Promise<Array<IJob>> => {
  const { companyId } = data
  let jobs: Array<IJob>
  if (data.companyId) {
    jobs = await JobModel.find({ companyId })
      .populate('companyId')
  } else {
    jobs = await JobModel.find()
      .populate('companyId')
  }

  return _.map(jobs, job => {
    if (!job.companyId) return job

    _.set(job, '_doc.relationships.company', formatResource(job.companyId))
    _.set(job, '_doc.companyId', job.companyId._id)
    return job;
  })
}

export const findById = async (_id: Types.ObjectId): Promise<IJob> => {
  return await JobModel.findById(_id);
}

// export const uploadPdf