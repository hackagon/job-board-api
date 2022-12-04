"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    dob: {
        type: Date,
    },
    userType: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});
// create + update
exports.UserSchema.pre('save', function (next) {
    // this.isNew true => create => hash password
    // this.isNew false => update document
    // - this.isModifield(password) true => hash password
    // - this.isModifield(password) false => not hash
    if (!this.isNew && !this.isModified('password'))
        return next();
    return bcryptjs_1.default.genSalt(10)
        .then(salt => {
        return bcryptjs_1.default.hash(this.password.toString(), salt);
    })
        .then(hash => {
        this.password = hash;
        next();
    })
        .catch(err => {
        throw err;
    });
});
const UserModel = mongoose_1.default.model('User', exports.UserSchema, 'User');
UserModel.createIndexes();
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map