import { NextFunction, Request, Response } from 'express';
import _ from 'lodash'

export const wapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {

    // post
    const body = req.body;

    // get, patch
    const id = req.params;
    const query = req.query;

    const data = { ...body, id, ...query }
    const result = fn(data);

    _.set(res, 'result', result);
    return next()
  }
}