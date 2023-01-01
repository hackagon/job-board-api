import VerificationModel, { IVerification } from "../models/verification.model";
import jsonwebtoken from 'jsonwebtoken'
import UserModel from "../models/user.model";
import bcrypt from 'bcryptjs';
import config from '../config'

export const createJwt = (email: string) => {
  return jsonwebtoken.sign({ email }, config.JWT_SECRET_KEY, {
    expiresIn: '1d'
  })
}

export const create = async (data: any) => {
  return VerificationModel.create(data);
}

export const login = async (data: any) => {
  const { email, password } = data;

  return UserModel.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({
        status: 404,
        message: "User not found"
      })

      return bcrypt.compare(password, user.password)
    })
    .then(isMatched => {
      if (!isMatched) return Promise.reject({
        status: 401,
        message: "Email and password not match"
      })

      // jwt
      const jwt = createJwt(email);
      return create({ email, jwt })
    })
    .catch(err => {
      throw err;
    })
}