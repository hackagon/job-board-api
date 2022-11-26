import mongoose from "mongoose";

export interface IGeneral extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}