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
exports.deleteByIdController = exports.getAllUsersController = exports.getAllController = exports.getByIdController = exports.createController = void 0;
const chatRoomService_1 = require("../services/chatRoomService");
const statusCodes_1 = require("../constants/statusCodes");
const chatRoomService_2 = require("../services/chatRoomService");
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userIds } = req.body;
    const userId = req.user.userId; // Use the authenticated user's ID
    try {
        // Include the authenticated user's ID in the userIds array
        const room = yield (0, chatRoomService_1.createRoom)(name, userIds, userId);
        res.status(statusCodes_1.HTTP_STATUS.CREATED).json({ message: 'Chat room created', data: room });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.createController = createController;
const getByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const userId = req.user.userId;
    try {
        const room = yield (0, chatRoomService_1.getRoom)(Number(roomId), userId);
        res.status(statusCodes_1.HTTP_STATUS.OK).json({ data: room });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.getByIdController = getByIdController;
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const rooms = yield (0, chatRoomService_2.getAllRooms)(userId);
        res.status(statusCodes_1.HTTP_STATUS.OK).json({ data: rooms });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.getAllController = getAllController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const users = yield (0, chatRoomService_1.getAllUsers)(userId);
        res.status(statusCodes_1.HTTP_STATUS.OK).json({ data: users });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.getAllUsersController = getAllUsersController;
const deleteByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const userId = req.user.userId;
    try {
        yield (0, chatRoomService_1.deleteRoom)(Number(roomId), userId);
        res.status(statusCodes_1.HTTP_STATUS.NO_CONTENT).json({ message: 'Chat room deleted' });
    }
    catch (error) {
        res.status(statusCodes_1.HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
});
exports.deleteByIdController = deleteByIdController;
