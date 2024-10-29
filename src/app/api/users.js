// src/app/api/users.js
export async function POST(request) {
    const { username } = await request.json(); // รับค่า username จาก body

    if (!username) {
        return new Response(JSON.stringify({ message: "Username is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // สมมติว่าเรามี array ของ usernames ที่มีอยู่ในฐานข้อมูล
    const availableUsers = ['user1', 'user2', 'user3']; // แทนที่ด้วยการดึงข้อมูลจาก database

    if (!availableUsers.includes(username)) {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // ถ้าพบ username ก็สามารถดำเนินการได้ตามต้องการ
    return new Response(JSON.stringify({ message: "User found" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
