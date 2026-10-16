# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can add short notes, give each one a category (Personal, Work or Study), search through them and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work, Study)
- Each note shows its text, category label, date/time and a Delete button
- Validation: empty notes and notes over 200 characters show an error
- Delete individual notes, or use "Clear all" (with confirmation)
- Live, case-insensitive search with a "No notes match your search." message
- Note counter: no notes, 1 note, or N notes
- Notes saved with localStorage
- Responsive layout (form stacks on screens 600px or narrower)

## How to run locally

1. Clone the repository: `git clone https://github.com/your-username/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (no build step or server needed).

## What I learned

- How to structure a page with semantic tags (`header`, `main`, `section`, `footer`) and link labels to inputs.
- How to use Flexbox and a media query to build a layout that works on phones.
- How to build the page from an array of objects with `createElement` and `textContent`, which keeps user text safe from HTML injection.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to make small, clear Git commits as each feature is finished.