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
exports.hello = exports.getPlant = exports.addPlant = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const plant_1 = __importDefault(require("../models/plant"));
const addPlant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const symptoms = req.body.symptoms;
    const setting = req.body.setting;
    const location = req.body.location;
    const userId = req.body.userId;
    try {
        if (!name || !symptoms || !setting || !location || !userId) {
            throw (0, http_errors_1.default)(400, 'All the parameters most be filled to create a new plant');
        }
        const newPlant = yield plant_1.default.create({
            name,
            symptoms,
            setting,
            location,
            userId,
        });
        res.status(201).send(newPlant);
    }
    catch (err) {
        next(err);
    }
});
exports.addPlant = addPlant;
const getPlant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    try {
        if (!userId) {
            throw (0, http_errors_1.default)(400, 'Parameters missing');
        }
        const plants = yield plant_1.default.find({ userId }).exec();
        if (!plants) {
            throw (0, http_errors_1.default)(401, 'No plant added yet');
        }
        res.status(201).send(plants);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getPlant = getPlant;
const hello = (req, res, next) => {
    try {
        res.send('plant route');
    }
    catch (error) {
        next(error);
    }
};
exports.hello = hello;
//# sourceMappingURL=plant.js.map