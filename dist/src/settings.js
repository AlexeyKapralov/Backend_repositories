"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SETTINGS = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    PATH: {
        BLOGS: '/blogs',
        TEST_DELETE: '/testing/all-data'
    },
    ADMIN_AUTH: process.env.ADMIN_AUTH || '',
};
