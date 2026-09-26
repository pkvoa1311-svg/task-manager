const API_URL = '/api/tasks';
let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const descriptionInput = document.getElementById('descriptionInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const filterBtns = document.querySelectorAll('.filter-btn');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') addTask();
});
descriptionInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') addTask();
});

filterBtns.forEach((button) => {
  button.addEventListener('click', () => {
    filterBtns.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Request failed');
  }
  return payload;
}

async function fetchTasks() {
  try {
    const payload = await request(API_URL);
    tasks = Array.isArray(payload) ? payload : (payload.data || []);
    renderTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    showError(error.message);
  }
}

async function addTask() {
  const title = taskInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    alert('Please enter a task title');
    taskInput.focus();
    return;
  }

  try {
    addBtn.disabled = true;
    await request(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    taskInput.value = '';
    descriptionInput.value = '';
    await fetchTasks();
  } catch (error) {
    alert(error.message);
  } finally {
    addBtn.disabled = false;
  }
}

async function toggleTask(id) {
  const task = tasks.find((item) => item._id === id);
  if (!task) return;

  try {
    await request(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    await fetchTasks();
  } catch (error) {
    alert(error.message);
    await fetchTasks();
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    await fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

function renderTasks() {
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  taskList.innerHTML = '';
  emptyState.classList.toggle('show', filteredTasks.length === 0);

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta">Created: ${new Date(task.createdAt).toLocaleDateString()}</div>
      </div>
      <div class="task-actions">
        <button class="btn-small btn-delete" type="button">Delete</button>
      </div>
    `;
    li.querySelector('.task-checkbox').addEventListener('change', () => toggleTask(task._id));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task._id));
    taskList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter((task) => task.completed).length;
}

function showError(message) {
  emptyState.textContent = `Unable to load tasks: ${message}`;
  emptyState.classList.add('show');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

fetchTasks();
