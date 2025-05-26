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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(listItem);
        updateStorage();
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Görev ekleme
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        renderTask(text);
        taskInput.value = "";
        updateStorage();
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
