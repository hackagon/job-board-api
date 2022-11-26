"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMany = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const create = (data) => {
    const { password } = data;
    return bcryptjs_1.default.genSalt(10)
        .then(salt => {
        return bcryptjs_1.default.hash(password, salt);
    })
        .then(hash => {
        data.password = hash;
        return user_model_1.default.create(data);
    })
        .catch(err => {
        throw err;
    });
};
exports.create = create;
const findMany = () => {
    return user_model_1.default.find();
};
exports.findMany = findMany;
//# sourceMappingURL=user.service.js.map