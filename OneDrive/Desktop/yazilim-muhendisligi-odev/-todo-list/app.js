const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Sayfa yüklendiğinde görevleri yükle
tasks.forEach(task => renderTask(task.text, task.completed));

// Görev oluşturma fonksiyonu
function renderTask(text, completed = false) {
    const listItem = document.createElement('li');
    listItem.textContent = text;

    if (completed) listItem.classList.add('completed');

    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        updateStorage();
    });

    const deleteButton = document.createElement('button'); // 👈 EKLENDİ
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener('click', () => {
        const confirmed = confirm("Bu görevi silmek istediğinize emin misiniz?");
        if (confirmed) {
            taskList.removeChild(listItem);
            updateStorage(); // LocalStorage'ı da güncelle
        }
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Görev ekleme butonuna tıklanınca
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        renderTask(text);
        updateStorage();
        taskInput.value = "";
    }
});

// localStorage güncelle
function updateStorage() {
    const items = document.querySelectorAll('#task-list li');
    const data = [];

    items.forEach(item => {
        const text = item.childNodes[0].nodeValue.trim();
        const completed = item.classList.contains('completed');
        data.push({ text, completed });
    });

    localStorage.setItem('tasks', JSON.stringify(data));
}

// Filtreleme butonları
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
