# 📝 Task Manager - To-Do List Application

A modern, full-stack To-Do List application built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 🎯 Features

✅ **Create Tasks** - Add new tasks with title and description  
✅ **Mark Complete** - Check off tasks as you complete them  
✅ **Delete Tasks** - Remove tasks you no longer need  
✅ **Filter Tasks** - View all, active, or completed tasks  
✅ **Statistics** - Track total and completed tasks  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  
✅ **Beautiful UI** - Modern gradient design with smooth animations  

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Render

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pkvoa1311-svg/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB:**
   - Open `.env` and update `MONGODB_URI`:
     ```
     MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task-manager
     ```
   - Or use local MongoDB:
     ```
     MONGODB_URI=mongodb://localhost:27017/task-manager
     ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open in browser:**
   ```
   http://localhost:5000
   ```

---

## 🚀 Deployment to Render

### Step 1: Connect GitHub Repository
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → Select **"Web Service"**
3. Connect your GitHub account
4. Select `pkvoa1311-svg/task-manager` repository

### Step 2: Configure the Service
- **Name:** `task-manager`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free (or select your preferred plan)

### Step 3: Add Environment Variables
Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `NODE_ENV` | `production` |

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Drivers" → Copy connection string
4. Replace `<password>` and `<username>` with your credentials

### Step 4: Deploy
- Click **"Create Web Service"**
- Render will automatically deploy your app
- Your app will be live at: `https://task-manager-xxxxx.onrender.com`

---

## 📚 API Endpoints

### GET `/api/tasks`
Get all tasks
```bash
curl http://localhost:5000/api/tasks
```

### GET `/api/tasks/:id`
Get single task by ID
```bash
curl http://localhost:5000/api/tasks/123456789
```

### POST `/api/tasks`
Create a new task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Complete Node.js tutorial"}'
```

### PUT `/api/tasks/:id`
Update a task
```bash
curl -X PUT http://localhost:5000/api/tasks/123456789 \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","completed":true}'
```

### DELETE `/api/tasks/:id`
Delete a task
```bash
curl -X DELETE http://localhost:5000/api/tasks/123456789
```

### GET `/api/health`
Health check
```bash
curl http://localhost:5000/api/health
```

---

## 📁 Project Structure

```
task-manager/
├── server.js              # Express server & API routes
├── package.json           # Dependencies
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── render.yaml            # Render deployment config
├── README.md              # This file
└── public/
    ├── index.html         # Frontend HTML
    ├── styles.css         # Frontend styling
    └── app.js             # Frontend logic
```

---

## 🎨 Customization

### Change Port
Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 5000 to 3000
```

### Add More Fields
Modify the Task Schema in `server.js`:
```javascript
const taskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  dueDate: Date,
  // Add more fields...
});
```

### Customize Colors
Edit `public/styles.css`:
```css
/* Change gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 🐛 Troubleshooting

### "MongoDB connection error"
- Check MongoDB URI in `.env`
- Ensure MongoDB service is running (for local MongoDB)
- Verify network access (for MongoDB Atlas)

### "Port already in use"
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 License

MIT License - Feel free to use this project for any purpose!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 💬 Questions?

If you have any questions, feel free to open an issue on GitHub!

**Happy Task Managing!** 🚀✨
