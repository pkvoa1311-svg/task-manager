# 📚 API Documentation - Task Manager

Complete API reference สำหรับ Task Manager

---

## 🌐 Base URL

```
http://localhost:5000/api        (Local)
https://task-manager-xxx.onrender.com/api  (Production)
```

---

## 📍 Endpoints

### 1️⃣ Get All Tasks

**Request:**
```http
GET /api/tasks
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Learn Node.js",
      "description": "Complete Node.js tutorial",
      "completed": false,
      "createdAt": "2024-09-26T07:00:00.000Z",
      "updatedAt": "2024-09-26T07:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Build API",
      "description": "Create REST API",
      "completed": true,
      "createdAt": "2024-09-26T08:00:00.000Z",
      "updatedAt": "2024-09-26T08:30:00.000Z"
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:5000/api/tasks
```

---

### 2️⃣ Get Single Task

**Request:**
```http
GET /api/tasks/:id
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | Yes | Task ID (MongoDB ObjectId) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "completed": false,
    "createdAt": "2024-09-26T07:00:00.000Z",
    "updatedAt": "2024-09-26T07:00:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

**Example:**
```bash
curl http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

---

### 3️⃣ Create Task

**Request:**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Learn MongoDB",
  "description": "Study MongoDB basics"
}
```

**Body Parameters:**
| Name | Type | Required | Validation |
|------|------|----------|-----------|
| `title` | String | Yes | Max 100 chars, cannot be empty |
| `description` | String | No | Max 500 chars |

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Learn MongoDB",
    "description": "Study MongoDB basics",
    "completed": false,
    "createdAt": "2024-09-26T09:00:00.000Z",
    "updatedAt": "2024-09-26T09:00:00.000Z"
  }
}
```

**Response (400):**
```json
{
  "success": false,
  "error": "Title is required and cannot be empty"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn MongoDB",
    "description": "Study MongoDB basics"
  }'
```

---

### 4️⃣ Update Task

**Request:**
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true
}
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | Yes | Task ID |

**Body Parameters:**
| Name | Type | Required | Validation |
|------|------|----------|-----------|
| `title` | String | No | Max 100 chars, cannot be empty if provided |
| `description` | String | No | Max 500 chars |
| `completed` | Boolean | No | true or false |

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "description": "Updated description",
    "completed": true,
    "createdAt": "2024-09-26T07:00:00.000Z",
    "updatedAt": "2024-09-26T10:00:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

---

### 5️⃣ Delete Task

**Request:**
```http
DELETE /api/tasks/:id
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | String | Yes | Task ID |

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Response (404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

---

### 6️⃣ Health Check

**Request:**
```http
GET /api/health
```

**Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "development",
  "uptime": 1234.56
}
```

**Example:**
```bash
curl http://localhost:5000/api/health
```

---

### 7️⃣ API Info

**Request:**
```http
GET /api
```

**Response (200):**
```json
{
  "name": "Task Manager API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/tasks": "Get all tasks",
    "GET /api/tasks/:id": "Get single task",
    "POST /api/tasks": "Create task",
    "PUT /api/tasks/:id": "Update task",
    "DELETE /api/tasks/:id": "Delete task",
    "GET /api/health": "Health check"
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api
```

---

## 🔧 Usage Examples

### JavaScript (Fetch API)

```javascript
// Get all tasks
fetch('/api/tasks')
  .then(res => res.json())
  .then(data => console.log(data));

// Create task
fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Update task
fetch('/api/tasks/507f1f77bcf86cd799439011', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Delete task
fetch('/api/tasks/507f1f77bcf86cd799439011', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### cURL

```bash
# Get all
curl http://localhost:5000/api/tasks

# Create
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task"}'

# Update
curl -X PUT http://localhost:5000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete
curl -X DELETE http://localhost:5000/api/tasks/:id
```

### Python (requests)

```python
import requests

# Get all tasks
response = requests.get('http://localhost:5000/api/tasks')
print(response.json())

# Create task
response = requests.post('http://localhost:5000/api/tasks', json={
    'title': 'New Task',
    'description': 'Description'
})
print(response.json())

# Update task
response = requests.put('http://localhost:5000/api/tasks/:id', json={
    'completed': True
})
print(response.json())

# Delete task
response = requests.delete('http://localhost:5000/api/tasks/:id')
print(response.json())
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation Error",
  "details": ["Title is required"]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Task not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "Error message"
}
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🔐 Data Types

### Task Object
```javascript
{
  _id: String,           // MongoDB ObjectId
  title: String,         // Task title (required, max 100)
  description: String,   // Task description (optional, max 500)
  completed: Boolean,    // Completion status (default: false)
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

---

## 🎯 Quick Tips

1. **Always validate input** - Empty titles will be rejected
2. **Use proper headers** - Set `Content-Type: application/json`
3. **Check responses** - Always check `success` field
4. **Handle errors** - Implement error handling for all requests
5. **Rate limiting** - No limit currently, but keep requests reasonable

---

**API Ready to Use!** 🚀
