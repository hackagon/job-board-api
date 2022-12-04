import mongoose from 'mongoose';
import { IGeneral } from './interface';

/**
 * @todo validate email (email valid, email unique)
 */
export interface ICompany extends IGeneral {
  name: string;
  description: string;
  address: string;
  creatorId: mongoose.Types.ObjectId;
}

export const CompanySchema = new mongoose.Schema<ICompany>({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})



const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema, 'Company');

export default CompanyModel;