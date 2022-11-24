"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMany = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const create = (data) => {
    return user_model_1.default.create(data);
};
exports.create = create;
const findMany = () => {
    return user_model_1.default.find();
};
exports.findMany = findMany;
