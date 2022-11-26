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

export interface IPaginationResponse {
  // trang hien tai
  currentPage: number;

  // so item trong trang hien tai
  itemCount: number;

  // so phan tu toi da co the co trong 1 trang = limit (query request frontend)
  itemsPerPage: number

  // tong so phan tu toi da
  totalItems: number;

  // tong so trang
  totalPages: number;
}

export interface IJsonApiCollection {
  data: Array<IJsonApiReource>;
  links: {
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
  };
  meta: IPaginationResponse;
}