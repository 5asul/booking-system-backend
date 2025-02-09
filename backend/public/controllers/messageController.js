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
exports.getMessages = exports.send = void 0;
const messageService_1 = require("../services/messageService");
const statusCodes_1 = require("../constants/statusCodes");
const send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, roomId } = req.body;
    const senderId = req.user.userId; // Extracted from auth middleware
    try {
        const message = yield (0, messageService_1.sendMessage)(content, senderId, roomId);
        res.status(statusCodes_1.HTTP_STATUS.CREATED).json({ message: 'Message sent', data: message });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.send = send;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    try {
        const messages = yield (0, messageService_1.fetchMessages)(Number(roomId));
        res.status(statusCodes_1.HTTP_STATUS.OK).json({ data: messages });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.getMessages = getMessages;
