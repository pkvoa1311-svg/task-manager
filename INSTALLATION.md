# 📦 Installation Guide - Task Manager

วิธีติดตั้งและเตรียมระบบ Task Manager ให้พร้อมใช้งาน

---

## 🚀 Quick Start (3 ขั้นตอนง่าย ๆ)

### ขั้นตอนที่ 1: เตรียม MongoDB
```bash
# เข้า https://www.mongodb.com/cloud/atlas
# 1. Sign Up ฟรี
# 2. สร้าง Cluster (M0 Free)
# 3. สร้าง Database User
# 4. Copy Connection String
```

### ขั้นตอนที่ 2: Clone & Install
```bash
git clone https://github.com/pkvoa1311-svg/task-manager.git
cd task-manager
npm install
```

### ขั้นตอนที่ 3: ตั้งค่าและรัน
```bash
cp .env.example .env
# แก้ไข .env และใส่ MONGODB_URI
npm start
```

✅ เปิด http://localhost:5000 ใช้งานได้เลย!

---

## 📋 ขั้นตอนทีละอย่าง

### 1️⃣ สร้าง MongoDB Atlas (ฐานข้อมูลฟรี)

#### Step 1.1: Sign Up
- เข้า https://www.mongodb.com/cloud/atlas
- กด **"Sign Up"** (หรือ **"Try Free"**)
- เลือก **"Sign up with Google"** หรือ **"Sign up with Email"**

#### Step 1.2: สร้างบัญชี
```
Email: ใช้ Gmail ของพี่
Password: สร้างรหัสผ่าน (8+ ตัวอักษร)
```

#### Step 1.3: สร้าง Organization
```
Organization Name: Task Manager (หรือชื่ออื่น)
Project Name: task-manager-project
```
- กด **"Next"** → **"Create Organization"**

#### Step 1.4: สร้าง Cluster
- เลือก **"M0 Free"** (ฟรี ไม่เสียเงิน)
- Region: **"Singapore"** หรือ **"Tokyo"**
- กด **"Create Deployment"**
- รอ 3-5 นาที (Cluster กำลังสร้าง)

#### Step 1.5: ตั้งรหัสผ่าน Database User
1. กด **"SECURITY"** ด้านซ้าย
2. เลือ **"Database Access"**
3. กด **"Add New Database User"**
4. กรอกข้อมูล:
```
Username: taskuser
Password: Pass@12345 (จำไว้!)
```
5. กด **"Add User"**

#### Step 1.6: หา Connection String
1. กด **"DEPLOYMENT"** → **"Database"**
2. กด **"Connect"** ที่ Cluster
3. เลือ **"Drivers"** (Node.js)
4. Copy Connection String:
```
mongodb+srv://taskuser:Pass@12345@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### Step 1.7: ปรับแต่ง Connection String
ลบ `?retryWrites=true&w=majority` และเพิ่มชื่อ DB:
```
mongodb+srv://taskuser:Pass@12345@cluster0.xxxxx.mongodb.net/task-manager
```

✅ **บันทึก Connection String นี้ไว้!**

---

### 2️⃣ ติดตั้งท้องถิ่น (Local Development)

#### Step 2.1: Clone Repository
```bash
git clone https://github.com/pkvoa1311-svg/task-manager.git
cd task-manager
```

#### Step 2.2: ติดตั้ง Dependencies
```bash
npm install
```
รอให้เสร็จ (ประมาณ 1-2 นาที)

#### Step 2.3: สร้างไฟล์ .env
```bash
cp .env.example .env
```

#### Step 2.4: แก้ไข .env
เปิดไฟล์ `.env` ด้วย Text Editor (VS Code, Notepad++)

แก้ไขเป็นแบบนี้:
```
PORT=5000
MONGODB_URI=mongodb+srv://taskuser:Pass@12345@cluster0.xxxxx.mongodb.net/task-manager
NODE_ENV=development
```

ใส่ Connection String จาก MongoDB Atlas ตรงนี้

#### Step 2.5: รัน Server
```bash
npm start
```

ถ้าเห็นข้อความนี้ = สำเร็จ! ✅
```
✅ MongoDB connected
🚀 Server running on port 5000
```

#### Step 2.6: เปิดใช้งาน
เปิดเบราว์เซอร์ไปที่:
```
http://localhost:5000
```

ถ้าเห็น **📝 Task Manager** = ใช้ได้แล้ว! 🎉

---

### 3️⃣ Deploy บน Render

#### Step 3.1: เข้า Render Dashboard
- เข้า https://dashboard.render.com/
- กด **"Sign up"** → **"Continue with GitHub"**

#### Step 3.2: เชื่อมต่อ GitHub
- ล็อกอิน GitHub
- ยอมให้ Render เข้าถึง Repository

#### Step 3.3: สร้าง Web Service
- กด **"New +"** ด้านบนขวา
- เลือ **"Web Service"**

#### Step 3.4: เลือก Repository
- ค้นหา **`task-manager`**
- กด **"Connect"**

#### Step 3.5: ตั้งค่า
```
Name: task-manager
Environment: Node
Region: Singapore
Branch: main
Build Command: npm install
Start Command: npm start
Plan: Free
```

#### Step 3.6: เพิ่ม Environment Variables
กด **"Advanced"** แล้ว **"Add Environment Variable"**

**ตัวที่ 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://taskuser:Pass@12345@cluster0.xxxxx.mongodb.net/task-manager
```
(ใส่ Connection String จาก MongoDB)

**ตัวที่ 2:**
```
Key: NODE_ENV
Value: production
```

**ตัวที่ 3:**
```
Key: PORT
Value: 5000
```

#### Step 3.7: Deploy
- กด **"Create Web Service"**
- รอให้ Status เปลี่ยนเป็น **"Live"** 🟢 (ประมาณ 2-5 นาที)

#### Step 3.8: เข้าใช้งาน
- Render จะให้ URL (เช่น `https://task-manager-uabc.onrender.com`)
- คัดลอก URL → เปิดเบราว์เซอร์
- ใช้งานได้แล้ว! ✅

---

## ✅ Checklist ก่อนเปิดใช้

- ✅ MongoDB Atlas สร้างเสร็จ
- ✅ ได้ Connection String
- ✅ Clone Repository
- ✅ `npm install` สำเร็จ
- ✅ `.env` ตั้งค่าถูกต้อง
- ✅ `npm start` ทำงาน
- ✅ เข้า http://localhost:5000 ได้
- ✅ Render Deploy สำเร็จ (Live)
- ✅ เข้า URL ของ Render ได้

---

## 🧪 ทดสอบการทำงาน

### Test 1: สร้างงาน
```
1. พิมพ์ "Test Task"
2. กด [+ Add Task]
3. ถ้าเห็นงาน = ✅ โอเค
```

### Test 2: ทำเครื่องหมายเสร็จ
```
1. กด ☐ ข้างงาน
2. ถ้ากลายเป็น ☑ = ✅ โอเค
```

### Test 3: ลบงาน
```
1. กด [Delete]
2. ถ้างานหาย = ✅ โอเค
```

### Test 4: Refresh & Check
```
1. Refresh หน้า (F5)
2. ถ้าข้อมูลยังอยู่ = ✅ บันทึกได้
```

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to MongoDB"
**สาเหตุ:** MONGODB_URI ผิด
**แก้:**
- ตรวจสอบ Connection String ถูกไหม
- ตรวจสอบ Username & Password
- ตรวจสอบ IP Whitelist ใน MongoDB Atlas

### ❌ "Port 5000 already in use"
**สาเหตุ:** Port ถูกใช้งานแล้ว
**แก้:**
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "Module not found"
**สาเหตุ:** Dependencies ไม่ครบ
**แก้:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Render shows Error"
**สาเหตุ:** MONGODB_URI ใน Render ผิด
**แก้:**
- เข้า Render Dashboard
- เปิด Service
- ไปที่ "Environment"
- ตรวจสอบ MONGODB_URI ว่าถูก

### ❌ "Data not saving"
**สาเหตุ:** ไม่เชื่อมต่อ MongoDB
**แก้:**
- ตรวจสอบ MongoDB Atlas เปิดอยู่ไหม
- ตรวจสอบ Network Connection

---

## 🔄 Flow การทำงาน

```
Frontend (HTML/CSS/JS)
        ↓
    API Calls
        ↓
Express Server (Node.js)
        ↓
Mongoose Models
        ↓
MongoDB Database
```

1. ผู้ใช้กรอกข้อมูลใน Frontend
2. JavaScript ส่ง API request
3. Express Server รับและประมวลผล
4. Mongoose บันทึกเข้า MongoDB
5. API ส่ง Response กลับ
6. Frontend อัปเดตหน้าจอ

---

## 📞 ติดต่อปัญหา

ถ้าติดปัญหา ลองอย่างนี้:

1. **ดูเอกสาร:** https://github.com/pkvoa1311-svg/task-manager/blob/main/README.md
2. **ตรวจสอบ Logs:** ดูข้อความใน Terminal/Browser Console
3. **ลองใหม่:** Restart Server (`Ctrl+C` แล้ว `npm start`)
4. **ถามเพื่อน:** GitHub Issues หรือ Discord

---

## ✨ สรุป

| ขั้นตอน | เวลา | ผลลัพธ์ |
|--------|------|--------|
| สร้าง MongoDB | 5 นาที | Connection String |
| Clone & Install | 2 นาที | node_modules |
| ตั้ง .env | 1 นาที | Environment Config |
| npm start | 1 นาที | Local Server Ready |
| Deploy Render | 5 นาที | Live on Web |

**รวม: ~15 นาที → ระบบใช้งานเต็มรูปแบบ! 🎉**

---

**Happy Task Managing!** 🚀✨
