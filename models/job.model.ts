import mongoose from 'mongoose';
import { ELevel, EMode } from '../interfaces';
import { IGeneral } from './interface';

/**
 * @todo validate email (email valid, email unique)
 */
export interface IJob extends IGeneral {
  title: string;
  level: ELevel; // fresher, junior, senior, leader, director, c-level
  mode: EMode;
  overview: string;
  description: string;
  requirement: string;
  benefit: string;
}

export const JobSchema = new mongoose.Schema<IJob>({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    default: EMode.onsite
  },
  overview: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  benefit: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})



const JobModel = mongoose.model<IJob>('Job', JobSchema, 'Job');

export default JobModel;