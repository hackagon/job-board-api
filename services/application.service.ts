import ApplicationModel, { IApplication } from "../models/application.model";


export const create = async (data: any): Promise<IApplication> => {
  return ApplicationModel.create(data);
}

export const findMany = async (data: any): Promise<Array<IApplication>> => {
  const { jobId } = data

  if (!jobId) return ApplicationModel.find({
    isActive: data.isActive
  })

  return ApplicationModel.find({
    isActive: data.isActive,
    jobId
  })
}
