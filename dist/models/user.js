"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Entrer votre mot de passe'],
        minLength: [6, 'Your password must be at least 6 characters long'],
        select: false
    },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: false, unique: true },
    matricule: { type: String, required: false, unique: true },
    role: {
        type: String,
        default: 'admin',
        enum: {
            values: ['user', 'admin']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    IdCreateur: {
        type: String,
        required: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map