const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ใช้งาน CORS
app.use(cors());

// ใช้ body-parser เพื่อให้สามารถอ่านข้อมูล JSON
app.use(express.json());

// เส้นทางสำหรับ POST /api/users
app.post('/api/users', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    // คุณสามารถเพิ่มผู้ใช้ลงในฐานข้อมูลหรือเก็บในตัวแปรได้ที่นี่
    res.status(201).json({ message: "User created", username });
});

// ตั้งค่าการเชื่อมต่อ Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send message', (msg) => {
        io.emit('receive message', msg); // ส่งข้อความไปยังผู้ใช้ทั้งหมด
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// กำหนดเส้นทางสำหรับตรวจสอบสถานะเซิร์ฟเวอร์
app.get('/', (req, res) => {
    res.send('Server is running');
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000; // ใช้พอร์ตจาก environment variable ถ้ามี
server.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
});

// จัดการข้อผิดพลาดที่ไม่คาดคิด
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
