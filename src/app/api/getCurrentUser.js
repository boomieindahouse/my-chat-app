// src/pages/api/getCurrentUser.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      const { id } = req.query; // ดึง id จาก query string
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // สมมติว่าดึงข้อมูลผู้ใช้จากฐานข้อมูลตาม ID
      const currentUser = { username: 'boomies', _id: id }; // ตัวอย่าง
      res.status(200).json(currentUser);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  