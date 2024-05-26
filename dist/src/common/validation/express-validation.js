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
exports.codeValidation = exports.contentCommentValidation = exports.blogIdInBodyValidation = exports.blogIdParamValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.searchNameTermValidation = exports.searchEmailTermValidation = exports.searchLoginTermValidation = exports.pageSizeValidation = exports.pageNumberValidation = exports.sortDirectionValidation = exports.sortByValidation = exports.emailValidationForResend = exports.emailValidationForRegistration = exports.passwordValidation = exports.loginOrEmailValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../../db/db");
exports.loginValidation = (0, express_validator_1.body)(['login'])
    .trim()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$')
    .custom((login) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.db.getCollection().usersCollection.find({ login: login }).toArray();
    if (users.length > 0) {
        throw new Error('login already exist');
    }
}));
exports.loginOrEmailValidation = (0, express_validator_1.body)(['loginOrEmail'])
    .trim()
    .isLength({ min: 3, max: 20 })
    .exists();
exports.passwordValidation = (0, express_validator_1.body)('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .exists();
exports.emailValidationForRegistration = (0, express_validator_1.body)('email')
    .trim()
    .isURL()
    .isLength({ min: 1 })
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.getCollection().usersCollection.find({ email: email }).toArray();
    if (user.length > 0) {
        throw new Error('email already use');
    }
}));
exports.emailValidationForResend = (0, express_validator_1.body)('email')
    .trim()
    .isURL()
    .isLength({ min: 1 })
    .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.getCollection().usersCollection.find({ email: email }).toArray();
    if (user.length === 0) {
        throw new Error('email incorrect');
    }
    if (user[0].isConfirmed) {
        throw new Error('email already is confirmed');
    }
}));
exports.sortByValidation = (0, express_validator_1.query)('sortBy').trim().default('createdAt');
exports.sortDirectionValidation = (0, express_validator_1.query)('sortDirection')
    .trim()
    // .isIn(['asc', 'desc'])
    .default('desc');
exports.pageNumberValidation = (0, express_validator_1.query)('pageNumber')
    .trim()
    .toInt()
    .default(1);
exports.pageSizeValidation = (0, express_validator_1.query)('pageSize').trim().toInt().default(10);
exports.searchLoginTermValidation = (0, express_validator_1.query)('searchLoginTerm')
    .trim()
    .default(null);
exports.searchEmailTermValidation = (0, express_validator_1.query)('searchEmailTerm')
    .trim()
    .default(null);
exports.searchNameTermValidation = (0, express_validator_1.query)('searchNameTerm')
    .trim()
    .default(null);
exports.nameValidation = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 });
exports.descriptionValidation = (0, express_validator_1.body)('description').trim().isLength({ min: 1, max: 500 });
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').trim().isLength({ min: 1, max: 100 }).isURL();
exports.titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 30 });
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 });
exports.contentValidation = (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 });
// так не делается, но для задачи нужно и по другому никак
exports.blogIdParamValidation = (0, express_validator_1.param)('id').trim().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.db.getCollection().blogsCollection.findOne({ _id: value });
    if (!blog) {
        throw new Error('blog not found');
    }
}));
exports.blogIdInBodyValidation = (0, express_validator_1.body)('blogId').trim().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.db.getCollection().blogsCollection.findOne({ _id: value });
    if (!blog) {
        throw new Error('blog not found');
    }
}));
exports.contentCommentValidation = (0, express_validator_1.body)('content')
    .trim()
    .isLength({ min: 20, max: 300 });
exports.codeValidation = (0, express_validator_1.body)('code')
    .trim()
    .isLength({ min: 1 })
    .custom((code) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.getCollection().usersCollection.findOne({ confirmationCode: code });
    if (!user) {
        throw new Error('user not found');
    }
    if (user.isConfirmed) {
        throw new Error('user already confirmed');
    }
    if (user.confirmationCodeExpired < new Date()) {
        throw new Error('confirmation code expired');
    }
}));
