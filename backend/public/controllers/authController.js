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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const statusCodes_1 = require("../constants/statusCodes");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield (0, authService_1.registerUser)({ username, email, password });
        res.status(statusCodes_1.HTTP_STATUS.CREATED).json({ message: 'User registered', user });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { user, token } = yield (0, authService_1.loginUser)(email, password);
        res.status(statusCodes_1.HTTP_STATUS.OK).json({ message: 'Login successful', data: { user, token } });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.login = login;
