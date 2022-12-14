import UserModel, { IUser } from "../models/user.model";
import bcrypt from 'bcryptjs';
import mongoose, { Types } from "mongoose";

export const findByEmail = (email: string) => {
  return UserModel.findOne({ email })
    .then(user => {
      if (user) return user;
      if (!user) Promise.reject({
        status: 404,
        message: 'User not found'
      })
    })
    .catch(err => {
      throw err;
    })
}

export const create = async (data: any): Promise<IUser> => {
  return UserModel.create(data);
}

export const findMany = () => {
  return UserModel.find();
}

export const updatePassword = (data: any): Promise<IUser> => {
  const { userId, oldPassword, newPassword } = data;
  return UserModel.findOne(new mongoose.Types.ObjectId(userId))
    .then(user => {
      // check if user exist
      if (!user) return Promise.reject({
        message: 'User not found'
      })

      // check oldPassword
      return Promise.all([
        user,
        bcrypt.compare(oldPassword, user.toObject().password)
      ])
      // update newPassword
    })
    .then(([user, isMatched]) => {
      if (!isMatched) return Promise.reject({
        message: "Old password is not matched"
      })

      user.password = newPassword;
      return user.save();
    })
    .catch(err => {
      throw err;
    })
}

export const findById = async (_id: Types.ObjectId): Promise<IUser> => {
  return await UserModel.findById(_id);
}

export const updateById = () => {

}