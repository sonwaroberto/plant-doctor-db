"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_CONNECTION_STRING: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(),
    SESSION_SECRET: (0, envalid_1.str)(),
    NODE_ENV: (0, envalid_1.str)(),
    NEXT_PUBLIC_JWT_KEY: (0, envalid_1.str)()
});
//# sourceMappingURL=validEnv.js.map