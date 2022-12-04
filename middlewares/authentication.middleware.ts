import { NextFunction, Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import _ from 'lodash';
import * as UserService from '../services/user.service';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // Headers Authorization: Bearer {{token}}
  // const jwt = _.last(_.split(_.get(req, 'headers.Authorization') as string, " "))
  const jwt = _.chain(req)
    .get('headers.authorization', '')
    .split(" ")
    .last()
    .value()

  if (!jwt) return res.status(401).json({ message: "Token is missing" })

  const result = jsonwebtoken.verify(jwt, 'mk98mb2RAZn^78tV!bok');

  const user = await UserService.findByEmail(_.get(result, "email"))

  _.set(req, 'user', user)

  next()
}