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
exports.deleteBlogByIdController = void 0;
const http_status_codes_1 = require("http-status-codes");
const blogs_service_1 = require("../../../service/blogs.service");
const deleteBlogByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteBlogByID(req.params.id);
    isDeleted ? res.sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT) : res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
});
exports.deleteBlogByIdController = deleteBlogByIdController;
