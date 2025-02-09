"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatRoomController_1 = require("../controllers/chatRoomController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/create', authMiddleware_1.authenticate, chatRoomController_1.createController);
router.delete('/delete/:roomId', authMiddleware_1.authenticate, chatRoomController_1.deleteByIdController);
router.all('/getUsers', authMiddleware_1.authenticate, chatRoomController_1.getAllUsersController);
router.get('/:roomId', authMiddleware_1.authenticate, chatRoomController_1.getByIdController);
router.all('/', authMiddleware_1.authenticate, chatRoomController_1.getAllController);
exports.default = router;
