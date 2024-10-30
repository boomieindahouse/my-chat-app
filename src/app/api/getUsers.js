// src/pages/api/getUsers.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      const users = [
        { username: 'boomies', _id: '6720b3d21a6a17302cc07604' },
        // เพิ่มข้อมูล user ที่ต้องการส่งออก
      ];
      res.status(200).json(users);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  