const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Sayfa yüklendiğinde görevleri yükle
tasks.forEach(task => renderTask(task.text, task.completed, task.date));

// Görev oluşturma fonksiyonu
function renderTask(text, completed = false, date = "") {
    const listItem = document.createElement('li');

    const content = document.createElement('span');
    content.textContent = text;

    const dateLabel = document.createElement('small');
    if (date) {
        dateLabel.textContent = ` (Son tarih: ${date})`;
        dateLabel.style.marginLeft = "10px";
        dateLabel.style.color = "#999";
    }

    listItem.appendChild(content);
    listItem.appendChild(dateLabel);

    if (completed) listItem.classList.add('completed');

    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        updateStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener('click', () => {
        const confirmed = confirm("Bu görevi silmek istediğinize emin misiniz?");
        if (confirmed) {
            taskList.removeChild(listItem);
            updateStorage();
        }
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Görev ekleme işlemi
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const date = taskDateInput.value;

    if (text) {
        renderTask(text, false, date);
        tasks.push({ text, completed: false, date });
        updateStorage();

        taskInput.value = "";
        taskDateInput.value = "";
    }
});

// localStorage güncelle
function updateStorage() {
    const items = document.querySelectorAll('#task-list li');
    const data = [];

    items.forEach(item => {
        const text = item.querySelector('span').textContent.trim();
        const completed = item.classList.contains('completed');
        const date = item.querySelector('small')?.textContent.match(/(\d{4}-\d{2}-\d{2})/)?.[0] || "";
        data.push({ text, completed, date });
    });

    tasks = data;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filtreleme işlemleri
document.getElementById('filter-all').addEventListener('click', () => {
    setFilter("all");
});

document.getElementById('filter-active').addEventListener('click', () => {
    setFilter("active");
});

document.getElementById('filter-completed').addEventListener('click', () => {
    setFilter("completed");
});

function setFilter(filter) {
    const items = document.querySelectorAll('#task-list li');
    items.forEach(item => {
        const completed = item.classList.contains('completed');
        item.style.display =
            filter === "all" ? "flex" :
            filter === "active" && !completed ? "flex" :
            filter === "completed" && completed ? "flex" :
            "none";
    });
}

// Arama kutusu
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('#task-list li');

    items.forEach(item => {
        const taskText = item.querySelector('span').textContent.toLowerCase();
        item.style.display = taskText.includes(query) ? "flex" : "none";
    });
});
const themeButton = document.getElementById('toggle-theme');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
