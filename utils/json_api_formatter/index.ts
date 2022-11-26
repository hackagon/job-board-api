import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import { IJsonApiCollection, IJsonApiReource } from './interface';
import { IGeneral } from '../../models/interface'

export const formatResource = (result: IGeneral): IJsonApiReource => {
  return {
    type: _.get(result, "constructor.modelName", "Custom"),
    _id: result._id,
    // lodash => _.chain
    // attributes: _.chain(result)
    //   .get("_doc", {})
    //   .omit(['_id', 'createdAt', 'updatedAt', 'password'])
    //   .value()
    // ,
    attributes: _.omit(result.toObject(), ['_id', 'createdAt', 'updatedAt', 'password']),
    relationships: {},
    meta: {
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }
}

// Get detail
// POST, PUT, PATCH, DELETE
export const formatJsonApiResource = (req: Request, res: Response, next: NextFunction) => {
  const result = _.get(req, "result", {}) as IGeneral;
  const responsedData = formatResource(result)
  return res.json(responsedData)
}

// Get list
export const formatJsonApiCollection = (req: Request, res: Response, next: NextFunction) => {
  const result = _.get(req, "result", {}) as Array<IGeneral>;

  const responsedData: IJsonApiCollection = {
    // data: _.map(result, formatResource),
    data: _.map(result, item => formatResource(item)),
    links: {
      first: "",
      last: "",
      next: "",
      previous: "",
    },
    meta: {
      currentPage: -1,
      itemCount: -1,
      itemsPerPage: -1,
      totalItems: -1,
      totalPages: -1,
    }
  }
  return res.json(responsedData)
}