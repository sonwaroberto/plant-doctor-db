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
exports.hello = exports.logout = exports.login = exports.getAuthenticatedUser = exports.signUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const passwordConf = req.body.confirmPassword;
    try {
        if (!username ||
            !email ||
            !passwordRaw ||
            !passwordConf) {
            throw (0, http_errors_1.default)(400, "Parameter 'username' or 'email' 'password' must be provided");
        }
        const existingEmail = yield user_1.default.findOne({ email }).exec();
        if (existingEmail) {
            throw (0, http_errors_1.default)(409, 'email already in use, please login instead');
        }
        const passwordHashed = yield bcrypt_1.default.hash(passwordRaw, 10);
        const newUser = yield user_1.default.create({
            username,
            email,
            password: passwordHashed,
        });
        res.status(201).send(newUser);
    }
    catch (err) {
        next(err);
    }
});
exports.signUp = signUp;
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            res.status(201).json(Object.assign({}, req.user._doc));
        }
        else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!email || !password) {
            throw (0, http_errors_1.default)(400, 'Parameters missing');
        }
        const user = yield user_1.default.findOne({ email })
            .select('+password +email')
            .exec();
        if (!user) {
            throw (0, http_errors_1.default)(401, 'Invalid credentials');
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, 'Invalid credentials');
        }
        return res.json({ token: jsonwebtoken_1.default.sign(Object.assign({}, user), 'RESTFULAPIs') });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    try {
        res.clearCookie('token'); // clear token cookie
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const items = [
    {
        name: 'BITTER LEAF',
        description: 'Bitter leaf plant jdflsdlfj lfdsjfkdjsklfjsdl sdlfjsdlfkdsjfklds sdfljsdlfjdslkj flksdjflksd fslsdklfjdls ksjflksjdfl klsf klsdf sjklfjdsl sjfklsd f sdflsdj',
        image: '~/images/plant1.png',
        button: 'more details',
    },
    {
        name: 'Item 2',
        description: 'Description for Item 2',
        image: '~/images/plant2.png',
        button: 'see more',
    },
    {
        name: 'Item 3',
        description: 'Description for Item 3',
        image: '~/images/plant3.png',
        button: 'see more',
    },
    {
        name: 'Item 4',
        description: 'Description for Item 4',
        image: '~/images/plant4.png',
        button: 'see more',
    },
    {
        name: 'Item 5',
        description: 'Description for Item 5',
        image: '~/images/plant1.png',
    },
    {
        name: 'Item 2',
        description: 'Description for Item 2',
        image: '~/images/plant2.png',
        button: 'see more',
    },
    {
        name: 'Item 3',
        description: 'Description for Item 3',
        image: '~/images/plant3.png',
        button: 'see more',
    },
    {
        name: 'Item 4',
        description: 'Description for Item 4',
        image: '~/images/plant4.png',
        button: 'see more',
    },
    {
        name: 'Item 5',
        description: 'Description for Item 5',
        image: '~/images/plant1.png',
    }
];
const hello = (req, res, next) => {
    try {
        res.json(items);
    }
    catch (error) {
        next(error);
    }
};
exports.hello = hello;
//# sourceMappingURL=users.js.map