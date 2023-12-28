var errors = {};

function showError(message) {
    if (!errors[message]) {
        errors[message] = 1;
    } else {
        errors[message]++;
    }

    var errorCount = errors[message];
    var errorCard = document.querySelector('.error-card[data-message="' + message + '"]');

    if (!errorCard) {
        errorCard = document.createElement('div');
        errorCard.classList.add('error-card');
        errorCard.setAttribute('data-message', message);
        errorCard.innerHTML = message;
        var container = document.getElementById('error-container');
        container.appendChild(errorCard);
    } else {
        errorCard.innerHTML = message + ' (x' + errorCount + ')';
    }

    errorCard.classList.remove('hide');

    setTimeout(function () {
        errorCard.classList.add('hide');
        setTimeout(function () {
            if (errorCard.parentNode) {
                errorCard.parentNode.removeChild(errorCard);
                delete errors[message];
            }
        }, 500);
    }, 5000);
}

function saveError() {
    showError('Error: Couldn\'t save note.');
}

function saveError_emptyNote() {
    showError('Error: Empty note, can\'t save note. ');
}

var notepad = document.getElementById('char-count');;
var savedNotes = JSON.parse(localStorage.getItem('notes')) || {};

function saveNote() {
    var noteContent = notepad.value.trim();
    if (noteContent.length === 0) {
        saveError_emptyNote();
        return;
    }

    var note = {
        title: document.getElementById('note-title').value || 'Untitled',
        content: notepad.value,
        preview: notepad.value.substr(0, 50) + '...'
    };

    var noteId = Date.now().toString();
    savedNotes[noteId] = note;
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    addNoteToSidebar(noteId, note.title, note.preview);
}

document.addEventListener('DOMContentLoaded', function () {
    var charCount = document.getElementById('char-count');
    var sidebar = document.getElementById('sidebar');
    var saveButton = document.getElementById('save-btn');

    notepad = document.getElementById('notepad');

    notepad.addEventListener('input', function () {
        var count = notepad.value.length;
        charCount.innerText = count;
    });

    function addNoteToSidebar(noteId, title, preview) {
        var noteLink = document.createElement('a');
        noteLink.href = '#';
        noteLink.innerText = title;
        noteLink.id = 'note-link-' + noteId;
        noteLink.addEventListener('click', function () {
            loadNoteById(noteId);
        });

        var noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.id = noteId;
        noteCard.appendChild(noteLink);
        noteCard.innerHTML += '<p>' + preview + '</p>';

        sidebar.appendChild(noteCard);

        savedNotes[noteId].linkElement = noteLink;
    }

    function loadNotes() {
        for (var noteId in savedNotes) {
            var note = savedNotes[noteId];
            addNoteToSidebar(noteId, note.title, note.preview);
        }
    }

    function loadNoteById(noteId) {
        var note = savedNotes[noteId];
        notepad.value = note.content;
        charCount.innerText = note.content.length;
        var noteLink = document.getElementById('note-link-' + noteId);
        noteLink.innerText = note.title;
    }

    saveButton.addEventListener('click', saveNote);

    window.addEventListener('load', function () {
        loadNotes();
    });
});