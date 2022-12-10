import mongoose from 'mongoose';
import { EApplicationStatus } from '../interfaces';
import { IGeneral } from './interface';

export interface IApplication extends IGeneral {
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: EApplicationStatus;
}

// isActive => true/false
// status => enum/string

export const ApplicationSchema = new mongoose.Schema<IApplication>({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  },
  status: {
    type: String,
    default: EApplicationStatus.active
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

const ApplicationModel = mongoose.model<IApplication>('Application', ApplicationSchema, 'Application');

export default ApplicationModel;