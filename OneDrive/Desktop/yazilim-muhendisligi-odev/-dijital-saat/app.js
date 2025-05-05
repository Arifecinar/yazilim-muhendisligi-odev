
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
