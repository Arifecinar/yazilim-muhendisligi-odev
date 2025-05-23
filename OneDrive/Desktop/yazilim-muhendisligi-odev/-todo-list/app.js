// Buton ve input alanını seç
const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Butona tıklanınca görev ekle
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        taskList.appendChild(listItem);
        taskInput.value = ""; // input'u temizle
    }
});
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Tamamlandı olayı
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        // Sil butonu
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // li'ye tıklamayı engelle
            taskList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        taskInput.value = "";
    }
});
