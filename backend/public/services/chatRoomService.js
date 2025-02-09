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
exports.deleteRoom = exports.getAllUsers = exports.getAllRooms = exports.getRoom = exports.createRoom = void 0;
const chatRoomModel_1 = require("../models/chatRoomModel");
const createRoom = (name, userIds, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allUserIds = [...userIds, userId];
    return (0, chatRoomModel_1.createChatRoomModel)(name, allUserIds);
});
exports.createRoom = createRoom;
const getRoom = (roomId, user) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, chatRoomModel_1.getChatRoomByIdModel)(roomId, user);
});
exports.getRoom = getRoom;
const getAllRooms = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, chatRoomModel_1.getAllChatRoomsModel)(user);
});
exports.getAllRooms = getAllRooms;
const getAllUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, chatRoomModel_1.getAllUsersModel)(userId);
});
exports.getAllUsers = getAllUsers;
const deleteRoom = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, chatRoomModel_1.deleteChatRoomModel)(roomId, userId);
});
exports.deleteRoom = deleteRoom;
