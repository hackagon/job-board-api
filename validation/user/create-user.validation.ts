import { Request, Response, NextFunction } from 'express'
import validator from 'validator';
import _ from 'lodash';
import UserModel from '../../models/user.model';

interface IErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors: IErrors = {};
  const { email, firstName, lastName } = req.body;

  // validate email: required, unique
  if (!email) {
    errors.email = "Email is required"
  } else if (validator.isEmpty(email)) {
    errors.email = "Email is not empty"
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid"
  } else {
    const foundUser = await UserModel.findOne({ email })
    if (foundUser) errors.email = "Email is already existed"
  }

  // validate firstName
  if (!firstName) {
    errors.firstName = "First name is required"
  } else if (!validator.isLength(firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must have 2-20 characters"
  }

  // validate lastName
  if (!lastName) {
    errors.lastName = "Last name is required"
  } else if (!validator.isLength(lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must have 2-20 characters"
  }


  if (_.isEmpty(errors)) return next();
  // throw next(createError(400));
  return res.status(404).json({
    message: "Bad request",
    errors
  });
}
