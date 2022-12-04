import CompanyModel, { ICompany } from "../models/company";


export const create = async (data: any): Promise<ICompany> => {
  return CompanyModel.create(data);
}

export const findMany = async (data: any): Promise<Array<ICompany>> => {
  return CompanyModel.find({
    isActive: data.isActive
  })
}

// export const uploadLogo = async (data: any): Promise<ICompany> => {
//   const buffer = data;

// }