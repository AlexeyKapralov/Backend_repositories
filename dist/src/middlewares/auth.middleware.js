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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_service_1 = require("../common/adapters/jwt.service");
const usersQuery_repository_1 = require("../repositories/users/usersQuery.repository");
const settings_1 = require("../common/config/settings");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({});
        return;
    }
    const typeAuth = req.headers.authorization.split(' ')[0];
    if (typeAuth === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        const userId = jwt_service_1.jwtService.getUserIdByToken(token);
        let result;
        if (userId) {
            result = yield usersQuery_repository_1.usersQueryRepository.findUserById(userId.toString());
        }
        if (result) {
            req.userId = result.id;
            next();
            return;
        }
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({});
        return;
    }
    if (typeAuth === 'Basic') {
        const auth = req.headers['authorization'];
        const buff = Buffer.from(auth.slice(5), 'base64');
        const decodedAuth = buff.toString('utf-8');
        if (decodedAuth !== settings_1.SETTINGS.ADMIN_AUTH || auth.slice(0, 5) !== 'Basic') {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({});
            return;
        }
        next();
    }
});
exports.authMiddleware = authMiddleware;
