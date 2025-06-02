const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const categoryInput = document.getElementById('category-input');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Sayfa yüklendiğinde görevleri yükle
tasks.forEach(task => renderTask(task.text, task.completed));

// Görev oluşturma fonksiyonu
function renderTask(text, completed = false, category = "") {
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    listItem.appendChild(taskSpan);

    if (category) {
        const categoryLabel = document.createElement('span');
        categoryLabel.textContent = category;
        categoryLabel.classList.add('category-label');
        listItem.appendChild(categoryLabel);
    }

    if (completed) listItem.classList.add('completed');

    // Görev tamamlama (toggle)
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        updateStorage();
    });

    // Silme butonu
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const confirmed = confirm("Bu görevi silmek istediğinize emin misiniz?");
        if (confirmed) {
            listItem.classList.add('fade-out');
            setTimeout(() => {
                taskList.removeChild(listItem);
                updateStorage();
            }, 300);
        }
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}


// Görev ekleme butonuna tıklanınca


addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const category = categoryInput.value.trim();

    if (text) {
        renderTask(text, false, category);
        updateStorage();
        taskInput.value = "";
        categoryInput.value = "";
    }
});


// localStorage güncelle
function updateStorage() {
    const items = document.querySelectorAll('#task-list li');
    const data = [];

    items.forEach(item => {
        const text = item.childNodes[0].textContent.trim();
        const categorySpan = item.querySelector('.category-label');
        const category = categorySpan ? categorySpan.textContent : "";
        const completed = item.classList.contains('completed');
        data.push({ text, completed, category });
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
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('#task-list li');

    items.forEach(item => {
        const taskText = item.firstChild.textContent.toLowerCase();
        item.style.display = taskText.includes(query) ? "flex" : "none";
    });
});
