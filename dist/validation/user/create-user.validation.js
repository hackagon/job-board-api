"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUser = void 0;
const validator_1 = __importDefault(require("validator"));
const lodash_1 = __importDefault(require("lodash"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = {};
    const { email, firstName, lastName } = req.body;
    // validate email: required, unique
    if (!email) {
        errors.email = "Email is required";
    }
    else if (validator_1.default.isEmpty(email)) {
        errors.email = "Email is not empty";
    }
    else if (!validator_1.default.isEmail(email)) {
        errors.email = "Email is invalid";
    }
    else {
        const foundUser = yield user_model_1.default.findOne({ email });
        if (foundUser)
            errors.email = "Email is already existed";
    }
    // validate password (password & confirm password)
    // validate firstName
    if (!firstName) {
        errors.firstName = "First name is required";
    }
    else if (!validator_1.default.isLength(firstName, { min: 2, max: 20 })) {
        errors.firstName = "First name must have 2-20 characters";
    }
    // validate lastName
    if (!lastName) {
        errors.lastName = "Last name is required";
    }
    else if (!validator_1.default.isLength(lastName, { min: 2, max: 20 })) {
        errors.lastName = "Last name must have 2-20 characters";
    }
    if (lodash_1.default.isEmpty(errors))
        return next();
    // throw next(createError(400));
    return res.status(404).json({
        message: "Bad request",
        errors
    });
});
exports.validateCreateUser = validateCreateUser;
