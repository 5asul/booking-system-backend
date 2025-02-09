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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersModel = exports.deleteChatRoomModel = exports.getChatRoomByIdModel = exports.getAllChatRoomsModel = exports.createChatRoomModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const createChatRoomModel = (name, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.chatRoom.create({
        data: {
            name,
            users: { connect: userIds.map((id) => ({ id })) }, // Correctly formats userIds for Prisma
        },
        include: {
            users: true,
        },
    });
});
exports.createChatRoomModel = createChatRoomModel;
const getAllChatRoomsModel = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all chat rooms with their users and messages
    const chatRooms = yield db_1.default.chatRoom.findMany({
        include: {
            users: true, // Include users in the chat room
            messages: { include: { sender: true } }, // Include messages and their senders
        },
    });
    if (!chatRooms) {
        throw new Error('No chat rooms found');
    }
    // Filter chat rooms where the user is a member
    const userChatRooms = chatRooms.filter((chatRoom) => chatRoom.users.some((user) => user.id === userid));
    // Check if the user is a member of any chat room
    if (userChatRooms.length === 0) {
        throw new Error('You are not a member of any chat room');
    }
    // Return only the chat rooms where the user is a member
    return userChatRooms;
});
exports.getAllChatRoomsModel = getAllChatRoomsModel;
const getChatRoomByIdModel = (roomId, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const chatRoom = yield db_1.default.chatRoom.findUnique({
        where: { id: roomId },
        include: { users: true, messages: { include: { sender: true } } },
    });
    if (!chatRoom) {
        throw new Error('Chat room not found');
    }
    const isMember = chatRoom.users.some((user) => user.id === userid);
    if (!isMember) {
        throw new Error('You are not a member of this chat room');
    }
    return chatRoom;
});
exports.getChatRoomByIdModel = getChatRoomByIdModel;
const deleteChatRoomModel = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the chat room exists
    const chatRoom = yield db_1.default.chatRoom.findUnique({
        where: { id: roomId },
        include: { users: true },
    });
    if (!chatRoom) {
        throw new Error('Chat room not found');
    }
    // Check if the user is a member of the chat room
    const isMember = chatRoom.users.some((user) => user.id === userId);
    if (!isMember) {
        throw new Error('You are not a member of this chat room');
    }
    // Delete the chat room
    const deletedRoom = yield db_1.default.chatRoom.delete({
        where: { id: roomId },
    });
    return deletedRoom;
});
exports.deleteChatRoomModel = deleteChatRoomModel;
const getAllUsersModel = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all users
    const users = yield db_1.default.user.findMany({
        where: { NOT: { id: userId } }, // Exclude the authenticated user
        select: {
            id: true,
            username: true, // Select only the username and id
        },
    });
    if (!users) {
        throw new Error('No users found');
    }
    return users;
});
exports.getAllUsersModel = getAllUsersModel;
