import mongoose from 'mongoose';
import { IGeneral } from './interface';
import bcrypt from 'bcryptjs';

/**
 * @todo validate email (email valid, email unique)
 */
export interface IUser extends IGeneral {
  email: String;
  password: String;
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
  password: {
    type: String,
    required: true,
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

// create + update
UserSchema.pre('save', function (next) {
  // this.isNew true => create => hash password
  // this.isNew false => update document
  // - this.isModifield(password) true => hash password
  // - this.isModifield(password) false => not hash

  if (!this.isNew && !this.isModified('password')) return next();

  return bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(this.password.toString(), salt)
    })
    .then(hash => {
      this.password = hash;
      next()
    })
    .catch(err => {
      throw err;
    })
});



const UserModel = mongoose.model<IUser>('User', UserSchema, 'User');

UserModel.createIndexes();

export default UserModel;