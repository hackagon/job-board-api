"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
// /api/users
userRouter.get('/users', (req, res, next) => {
    const users = [
        { id: 1, email: 'phonghiavan@gmail.com' },
        { id: 2, email: 'quanghung@gmail.com' },
    ];
    res.json({
        data: users
    });
});
exports.default = userRouter;
