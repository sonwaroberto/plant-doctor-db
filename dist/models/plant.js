"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    symptoms: { type: String, required: true },
    setting: { type: String, required: true },
    location: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Plant', plantSchema);
//# sourceMappingURL=plant.js.map