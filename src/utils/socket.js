// src/utils/socket.js
import { io } from "socket.io-client";

// เปลี่ยน URL ให้ตรงกับเซิร์ฟเวอร์ Socket.IO ของคุณ
const socket = io("http://localhost:3000");

export default socket;
