"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJsonApiCollection = exports.formatJsonApiResource = void 0;
const lodash_1 = __importDefault(require("lodash"));
// Get detail
// POST, PUT, PATCH, DELETE
const formatJsonApiResource = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const data = {
        type: lodash_1.default.get(result, "constructor.modelName", ""),
        _id: result._id,
        attributes: lodash_1.default.omit(result, ['_id', 'createdAt', 'updatedAt']),
        relationships: {},
        meta: {
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    };
    return res.json(data);
};
exports.formatJsonApiResource = formatJsonApiResource;
// Get list
const formatJsonApiCollection = (req, res, next) => {
};
exports.formatJsonApiCollection = formatJsonApiCollection;
