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
exports.loginController = void 0;
const login_service_1 = require("../../../service/login.service");
const http_status_codes_1 = require("http-status-codes");
const resultStatus_type_1 = require("../../../common/types/resultStatus.type");
const jwt_service_1 = require("../../../common/adapters/jwt.service");
const mappers_1 = require("../../../common/utils/mappers");
const usersQuery_repository_1 = require("../../../repositories/users/usersQuery.repository");
// export interface
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield login_service_1.loginService.loginUser(req.body);
    let accessToken;
    if (result.status === resultStatus_type_1.ResultStatus.Success) {
        const result = yield usersQuery_repository_1.usersQueryRepository.findUserByLoginOrEmail(req.body.loginOrEmail);
        accessToken = jwt_service_1.jwtService.createJwt((0, mappers_1.getUserViewModel)(result));
    }
    result.status === resultStatus_type_1.ResultStatus.Success
        ? res.status(http_status_codes_1.StatusCodes.OK).json({
            accessToken: accessToken
        })
        : res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
});
exports.loginController = loginController;
