let is24Hour = true;
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour
    });
    
    const date = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}

// Her saniyede bir saati güncelle
setInterval(updateTime, 1000);


// Sayfa yüklendiğinde saati hemen göster
updateTime();
// Mod geçiş fonksiyonu
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.clock').classList.toggle('dark-mode');
    
    const button = document.getElementById('toggle-mode');
    button.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'Switch to Light Mode';
    } else {
        button.textContent = 'Switch to Dark Mode';
    }
}

// Butona tıklanınca mod değiştir
document.getElementById('toggle-mode').addEventListener('click', toggleMode);
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
});
// Tema geçişi
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('theme2');
    document.querySelector('.clock').classList.toggle('theme2');
    document.querySelectorAll('button').forEach(btn => btn.classList.toggle('theme2'));
});
// Saat formatı değiştir
document.getElementById('format-toggle').addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateTime(); // format değişince saati hemen güncelle
});
