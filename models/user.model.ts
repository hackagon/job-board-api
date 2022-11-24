import mongoose from 'mongoose';
import { IGeneral } from './interface';


/**
 * @todo validate email (email valid, email unique)
 */
export interface IUser extends IGeneral {
  email: String;
  firstName: String;
  lastName: String;
  dob: Date;
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  dob: {
    type: Date,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})


const UserModel = mongoose.model<IUser>('User', UserSchema, 'User');

UserModel.createIndexes();


export default UserModel;