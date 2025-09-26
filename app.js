notesList.addEventListener('click', (e) => {
  if (e.target.matches('.deleteBtn')) {
    const id = e.target.dataset.id;
    const notes = loadNotes().filter(n => n.id !== id);
    saveNotes(notes);
    renderNotes();
  }
});



saveNoteBtn.addEventListener('click', async () => {
if (!currentImageData) return alert('Tire uma foto primeiro.');
const text = noteText.value || '';
let address = null;
if (currentCoords){
try {
const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${currentCoords.lat}&lon=${currentCoords.lon}`;
const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
const data = await resp.json();
address = data.display_name || null;
} catch (err) {
console.warn('Erro ao buscar endereço', err);
}
}
const notes = loadNotes();
const note = { id: Date.now().toString(), text, imageData: currentImageData, coords: currentCoords, address, createdAt: new Date().toISOString() };
notes.push(note);
saveNotes(notes);
// reset
currentImageData = null; currentCoords = null; noteText.value = '';
photo.src = '';
renderNotes();
});


// Init
renderNotes();


// PWA install prompt handler
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
deferredPrompt = e;
installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
if (!deferredPrompt) return;
deferredPrompt.prompt();
const choice = await deferredPrompt.userChoice;
installBtn.hidden = true;
deferredPrompt = null;
});


