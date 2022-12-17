import ApplicationModel, { IApplication } from "../models/application.model";


export const create = async (data: any): Promise<IApplication> => {
  return ApplicationModel.create(data);
}

export const findMany = async (data: any): Promise<Array<IApplication>> => {
  return ApplicationModel.find({
    isActive: data.isActive
  })
}
