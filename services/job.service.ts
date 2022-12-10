import JobModel, { IJob } from "../models/job.model";


export const create = async (data: any): Promise<IJob> => {
  return JobModel.create(data);
}

export const findMany = async (data: any): Promise<Array<IJob>> => {
  return JobModel.find({})
}

// export const uploadPdf