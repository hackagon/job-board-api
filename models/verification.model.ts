import mongoose from 'mongoose';
import { IGeneral } from './interface';
import { EVerificationType } from '../interfaces'

/**
 * @todo validate email (email valid, email unique)
 */
export interface IVerification extends IGeneral {
  email: string;
  type?: string; // password + code
  jwt?: string;
}

export const VerificationSchema = new mongoose.Schema<IVerification>({
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: EVerificationType.password
  },
  jwt: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})


const VerificationModel = mongoose.model<IVerification>('Verification', VerificationSchema, 'Verification');

VerificationModel.createIndexes();

export default VerificationModel;