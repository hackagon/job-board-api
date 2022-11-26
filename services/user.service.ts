import UserModel from "../models/user.model";
import bcrypt from 'bcryptjs';

export const create = (data: any) => {
  const { password } = data;

  return bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      data.password = hash;
      return UserModel.create(data);
    })
    .catch(err => {
      throw err;
    })
}

export const findMany = () => {
  return UserModel.find();
}