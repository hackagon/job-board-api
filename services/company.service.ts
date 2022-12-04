import CompanyModel, { ICompany } from "../models/company";

export const create = async (data: any): Promise<ICompany> => {
  return CompanyModel.create(data);
}