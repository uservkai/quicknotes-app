// ===== Selecting elements =====
const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all');

const STORAGE_KEY = 'quicknotes-notes';
let notes = [];

// ===== Persistence =====
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    notes = Array.isArray(saved) ? saved : [];
  } catch (e) {
    notes = [];
  }
}

// ===== Count message =====
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = 'You have ' + notes.length + ' notes.';
  }
}

// ===== Render =====
function render() {
  notesList.textContent = '';
  const term = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });

  visible.forEach(function (note) {
    const li = document.createElement('li');
    li.className = 'note-card category-' + note.category.toLowerCase();

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const category = document.createElement('span');
    category.className = 'note-category';
    category.textContent = note.category;

    const date = document.createElement('span');
    date.textContent = note.createdAt;

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    del.addEventListener('click', function () {
      deleteNote(note.id);
    });

    meta.append(category, date, del);
    li.append(text, meta);
    notesList.appendChild(li);
  });

  if (notes.length > 0 && visible.length === 0) {
    const msg = document.createElement('li');
    msg.className = 'no-results';
    msg.textContent = 'No notes match your search.';
    notesList.appendChild(msg);
  }

  updateCount();
  clearAllBtn.hidden = notes.length === 0;
}

// ===== Add =====
function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';
  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });
  saveNotes();
  noteInput.value = '';
  render();
}

// ===== Delete =====
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ===== Clear all =====
function clearAll() {
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
}

// ===== Events and start-up =====
form.addEventListener('submit', addNote);
searchInput.addEventListener('input', render);
clearAllBtn.addEventListener('click', clearAll);

loadNotes();
render();
