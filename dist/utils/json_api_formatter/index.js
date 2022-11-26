"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJsonApiCollection = exports.formatJsonApiResource = exports.formatResource = void 0;
const lodash_1 = __importDefault(require("lodash"));
const formatResource = (result) => {
    return {
        type: lodash_1.default.get(result, "constructor.modelName", "Custom"),
        _id: result._id,
        // lodash => _.chain
        // attributes: _.chain(result)
        //   .get("_doc", {})
        //   .omit(['_id', 'createdAt', 'updatedAt', 'password'])
        //   .value()
        // ,
        attributes: lodash_1.default.omit(result.toObject(), ['_id', 'createdAt', 'updatedAt', 'password']),
        relationships: {},
        meta: {
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    };
};
exports.formatResource = formatResource;
// Get detail
// POST, PUT, PATCH, DELETE
const formatJsonApiResource = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const responsedData = (0, exports.formatResource)(result);
    return res.json(responsedData);
};
exports.formatJsonApiResource = formatJsonApiResource;
// Get list
const formatJsonApiCollection = (req, res, next) => {
    const result = lodash_1.default.get(req, "result", {});
    const responsedData = {
        // data: _.map(result, formatResource),
        data: lodash_1.default.map(result, item => (0, exports.formatResource)(item)),
        links: {
            first: "",
            last: "",
            next: "",
            previous: "",
        },
        meta: {
            currentPage: -1,
            itemCount: -1,
            itemsPerPage: -1,
            totalItems: -1,
            totalPages: -1,
        }
    };
    return res.json(responsedData);
};
exports.formatJsonApiCollection = formatJsonApiCollection;
//# sourceMappingURL=index.js.map