"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserValidation = __importStar(require("../validation/user"));
const UserService = __importStar(require("../services/user.service"));
const lodash_1 = __importDefault(require("lodash"));
const json_api_formatter_1 = require("../utils/json_api_formatter");
const passport_1 = __importDefault(require("passport"));
const userRouter = express_1.default.Router();
/**
 * @todo Get list of users
 */
userRouter.get('/users', passport_1.default.authenticate('jwt', { session: true }), async (req, res, next) => {
    const users = await UserService.findMany();
    lodash_1.default.set(req, 'result', users);
    next();
}, json_api_formatter_1.formatJsonApiCollection);
/**
 * @todo Create user/register
 */
userRouter.post('/users', UserValidation.validateCreateUser, async (req, res, next) => {
    const data = req.body;
    const result = await UserService.create(data);
    lodash_1.default.set(req, 'result', result);
    next();
}, json_api_formatter_1.formatJsonApiResource);
/**
 * @todo Update user
 */
/**
 * @todo Replace user
 */
/**
 * @todo Delete user
 */
/**
 * @todo Get user by id
 */
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map