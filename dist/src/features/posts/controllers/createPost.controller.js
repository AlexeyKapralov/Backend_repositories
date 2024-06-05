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
exports.createPostController = void 0;
const http_status_codes_1 = require("http-status-codes");
const resultStatus_type_1 = require("../../../common/types/resultStatus.type");
const postsCompositionRoot_1 = require("../postsCompositionRoot");
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postsCompositionRoot_1.postsService.createPost(req.body);
    result.status === resultStatus_type_1.ResultStatus.Success ? res.status(http_status_codes_1.StatusCodes.CREATED).json(result.data) : res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
});
exports.createPostController = createPostController;
