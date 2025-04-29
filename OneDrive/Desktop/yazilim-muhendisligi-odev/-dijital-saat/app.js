
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
