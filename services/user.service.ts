import UserModel from "../models/user.model";

export const create = (data: any) => {
  return UserModel.create(data);
}

export const findMany = () => {
  return UserModel.find();
}