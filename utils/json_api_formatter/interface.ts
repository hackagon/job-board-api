import mongoose from "mongoose";

export interface IJsonApiReource {
  type: string;
  _id: mongoose.Types.ObjectId;
  attributes: any;
  relationships: any;
  meta: {
    createdAt: Date;
    updatedAt: Date;
  }
}

export interface IJsonApiCollection {

}