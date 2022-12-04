import mongoose from 'mongoose';
import { IGeneral } from './interface';

/**
 * @todo validate email (email valid, email unique)
 */
export interface IJob extends IGeneral {

}

export const JobSchema = new mongoose.Schema<IJob>({

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})



const JobModel = mongoose.model<IJob>('Job', JobSchema, 'Job');

export default JobModel;