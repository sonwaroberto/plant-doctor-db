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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const users_1 = __importDefault(require("./routes/users"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const validEnv_1 = __importDefault(require("./util/validEnv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = validEnv_1.default.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://comptabilite-dijital.vercel.app'],
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === validEnv_1.default.NEXT_PUBLIC_JWT_KEY) {
        jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err)
                req.user = undefined;
            req.user = decode;
            next();
        });
    }
    else {
        req.user = undefined;
        next();
    }
});
app.use('/api/users', users_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, 'Endpoint not found'));
});
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
mongoose_1.default
    .connect(validEnv_1.default.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log('Mongoose connected');
    app.listen(port, () => {
        console.log('Server listening on port: ' + port);
    });
})
    .catch(console.error);
//# sourceMappingURL=index.js.map