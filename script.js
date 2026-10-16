// ===== Selecting elements =====
const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all');

let notes = [];

// ===== Render =====
function render() {
  notesList.textContent = '';

  notes.forEach(function (note) {
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

    meta.append(category, date, del);
    li.append(text, meta);
    notesList.appendChild(li);
  });
}

// ===== Add =====
function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });
  noteInput.value = '';
  render();
}

// ===== Events and start-up =====
form.addEventListener('submit', addNote);
render();
