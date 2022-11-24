import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { IJsonApiReource } from './interface';
import { IGeneral } from '../../models/interface'

// Get detail
// POST, PUT, PATCH, DELETE
export const formatJsonApiResource = (req: Request, res: Response, next: NextFunction) => {
  const result = _.get(req, "result", {}) as IGeneral;
  const data: IJsonApiReource = {
    type: _.get(result, "constructor.modelName", ""),
    _id: result._id,
    attributes: _.omit(result, ['_id', 'createdAt', 'updatedAt']),
    relationships: {},
    meta: {
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }

  return res.json(data)
}

// Get list
export const formatJsonApiCollection = (req: Request, res: Response, next: NextFunction) => {

}