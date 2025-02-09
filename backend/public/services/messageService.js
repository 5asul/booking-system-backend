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
exports.fetchMessages = exports.sendMessage = void 0;
const messageModel_1 = require("../models/messageModel");
const sendMessage = (content, senderId, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, messageModel_1.createMessage)(content, senderId, roomId);
});
exports.sendMessage = sendMessage;
const fetchMessages = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, messageModel_1.getMessagesByRoom)(roomId);
});
exports.fetchMessages = fetchMessages;
