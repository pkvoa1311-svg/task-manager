# ⚡ Quick Start - Task Manager

เริ่มต้นใช้งาน Task Manager ได้อย่างรวดเร็ว!

---

## 🚀 ขั้นตอน 3 ก้าว (5 นาที)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/pkvoa1311-svg/task-manager.git
cd task-manager
npm install
```

### 2️⃣ ตั้งค่า MongoDB
```bash
# ไปที่ https://www.mongodb.com/cloud/atlas
# 1. สร้างบัญชีฟรี
# 2. สร้าง Cluster M0 (ฟรี)
# 3. ได้ Connection String
# 4. สร้าง .env file:

cp .env.example .env
# แก้ไข .env เพิ่ม:
# MONGODB_URI=mongodb+srv://ชื่อ:รหัส@cluster.mongodb.net/task-manager
```

### 3️⃣ รัน Server
```bash
npm start
# เข้า http://localhost:5000
```

✅ **เสร็จแล้ว! ใช้งานได้เลย!**

---

## 📋 Full Installation (ทีละขั้นตอน)

ดูที่: [INSTALLATION.md](INSTALLATION.md)

---

## 🌐 Deploy บน Render

```bash
# 1. เข้า https://dashboard.render.com/
# 2. Connect GitHub Repository
# 3. ตั้งค่า:
#    - Build: npm install
#    - Start: npm start
# 4. เพิ่ม Environment:
#    - MONGODB_URI=...
#    - NODE_ENV=production
# 5. Deploy!
```

---

## 📚 API Endpoints

```bash
# ดูทั้งหมด
GET /api

# ได้งานทั้งหมด
GET /api/tasks

# สร้างงาน
POST /api/tasks
Body: { "title": "งาน", "description": "..." }

# อัปเดตงาน
PUT /api/tasks/:id
Body: { "completed": true }

# ลบงาน
DELETE /api/tasks/:id

# Health Check
GET /api/health
```

---

## 🎯 ส่วนที่สำคัญ

| ไฟล์ | ความหมาย |
|-----|---------|
| `server.js` | Backend API |
| `public/index.html` | Frontend UI |
| `config.js` | ตั้งค่าระบบ |
| `package.json` | Dependencies |
| `.env.example` | Template Config |

---

## ✅ Checklist ก่อนใช้

- ✅ Node.js ติดตั้งแล้ว
- ✅ MongoDB Atlas สร้างแล้ว
- ✅ `.env` ตั้งค่าถูกต้อง
- ✅ `npm install` เสร็จ
- ✅ `npm start` ทำงาน
- ✅ เข้า http://localhost:5000 ได้

---

## 🐛 ตรวจสอบปัญหา

**MongoDB ไม่เชื่อมต่อ:**
```bash
# ตรวจสอบ .env
# ตรวจสอบ Connection String
# ตรวจสอบ Network Access ใน MongoDB Atlas
```

**Port 5000 ถูกใช้:**
```bash
# เปลี่ยน PORT ใน .env
PORT=3000
```

**Dependencies หายไป:**
```bash
npm install
```

---

## 🎉 Ready to Go!

Repository: https://github.com/pkvoa1311-svg/task-manager

**Happy Task Managing!** 🚀✨
