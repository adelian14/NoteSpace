var userIndex = JSON.parse(localStorage.getItem('activeUser'));
if (userIndex == null || userIndex == -1) window.location.href = 'index.html';

var users = getUsers();
var user = users[userIndex];

var logout = document.querySelector('#logoutBtn');
var title = document.querySelector('#user-name');
var profileImg = document.querySelector('.profile-img img');
var allAvatars = document.querySelectorAll('#all-avatars .img-box');
var newNoteInput = document.querySelector('#new-note-input');
var newNoteBtn = document.querySelector('#new-note-btn');
var notesContainer = document.querySelector('.notes');
var dirBtn = document.querySelector('#dirBtn');
document.querySelector('head title').textContent = 'NoteSpace - ' + user.Name;

displayPersonal();
displayNotes();


dirBtn.addEventListener('click', function () {
    if (dirBtn.getAttribute('dir') == 'ltr') {
        dirBtn.setAttribute('dir', 'rtl');
        newNoteInput.style.direction = 'rtl';
        newNoteInput.setAttribute('placeholder', 'ماذا يدور في ذهنك؟');
        dirBtn.textContent = 'Right to left';
    }
    else {
        dirBtn.setAttribute('dir', 'ltr');
        newNoteInput.style.direction = 'ltr';
        newNoteInput.setAttribute('placeholder', `What's on your mind`);
        dirBtn.textContent = 'Left to right';

    }
})

logout.addEventListener('click', function () {
    localStorage.removeItem('activeUser');
    window.location.href = 'index.html';
})

function displayPersonal() {
    title.innerHTML = 'Welcome, ' + user.Name;
    for (let i = 0; i < allAvatars.length; i++) {
        allAvatars[i].classList.remove('active');
    }
    allAvatars[user.Image].classList.add('active');
    profileImg.setAttribute('src', allAvatars[user.Image].children[0].getAttribute('src'));
}

for (let i = 0; i < allAvatars.length; i++) {
    allAvatars[i].setAttribute('imgIndex', i);
    allAvatars[i].addEventListener('click', function () {
        for (let j = 0; j < allAvatars.length; j++) {
            allAvatars[j].classList.remove('active');
        }
        this.classList.add('active');
        user.Image = Number(this.getAttribute('imgIndex'));
        displayPersonal();
        updateUsersGlobal();
    })
}

newNoteInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
})

function createNoteObject(text, dir = 'ltr') {
    var note = {
        time: getTimeNow(),
        content: text,
        id: user.nextNoteId++,
        dir: dir
    }
    return note;
}

newNoteBtn.addEventListener('click', function () {
    var text = newNoteInput.value;
    text = text.trim();
    if (text == '') return;
    var note = createNoteObject(text,dirBtn.getAttribute('dir'));
    user.Notes.push(note);
    updateUsersGlobal();
    displayNotes();
    newNoteInput.value = '';
})

function displayNotes() {
    var box = '';
    for (let i = user.Notes.length - 1; i > -1; i--) {
        box += `
            <div class="note px-4 py-3 mb-4">
                <div class="d-flex align-items-center justify-content-between">
                    <span class="time-stamp">${user.Notes[i].time}</span>
                    <button onclick="deleteNote(${user.Notes[i].id})" class="btn btn-outline-danger" style="border-color: rgba(255, 255, 255, .5); font-size: 13px;"><i style="color: rgba(255, 255, 255, .8);" class="fa-solid fa-trash"></i></button>
                </div>
            <p class="pt-3" style="direction: ${user.Notes[i].dir};">${user.Notes[i].content}</p>
        </div>
        `
    }
    notesContainer.innerHTML = box;
}



function deleteNote(idx) {
    var newNotes = [];
    for (let i = 0; i < user.Notes.length; i++) {
        if (idx == user.Notes[i].id) continue;
        newNotes.push(user.Notes[i]);
    }
    user.Notes = newNotes;
    displayNotes();
    updateUsersGlobal();
}
