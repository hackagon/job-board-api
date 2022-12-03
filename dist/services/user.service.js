"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.updatePassword = exports.findMany = exports.create = exports.findByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const findByEmail = (email) => {
    return user_model_1.default.findOne({ email })
        .then(user => {
        if (user)
            return user;
        if (!user)
            Promise.reject({
                status: 404,
                message: 'User not found'
            });
    })
        .catch(err => {
        throw err;
    });
};
exports.findByEmail = findByEmail;
const create = async (data) => {
    return user_model_1.default.create(data);
};
exports.create = create;
const findMany = () => {
    return user_model_1.default.find();
};
exports.findMany = findMany;
const updatePassword = (data) => {
    const { userId, oldPassword, newPassword } = data;
    return user_model_1.default.findOne(new mongoose_1.default.Types.ObjectId(userId))
        .then(user => {
        // check if user exist
        if (!user)
            return Promise.reject({
                message: 'User not found'
            });
        // check oldPassword
        return Promise.all([
            user,
            bcryptjs_1.default.compare(oldPassword, user.toObject().password)
        ]);
        // update newPassword
    })
        .then(([user, isMatched]) => {
        if (!isMatched)
            return Promise.reject({
                message: "Old password is not matched"
            });
        user.password = newPassword;
        return user.save();
    })
        .catch(err => {
        throw err;
    });
};
exports.updatePassword = updatePassword;
const updateById = () => {
};
exports.updateById = updateById;
//# sourceMappingURL=user.service.js.map