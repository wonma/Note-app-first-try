import { updateNote, removeNote } from './notes.js'
import { initializeEditPage, generateLastEdited } from './views.js'

const inputTitle = document.querySelector('#edit-title')
const inputBody = document.querySelector('#edit-body')
const timeInfo = document.querySelector('#time-info')
const removeBtn = document.querySelector('#edit-remove')

const noteID = location.hash.substring(1) // 요게 아주 핵심이네

initializeEditPage(noteID)


inputTitle.addEventListener('input', (e) => {
    const matchedNote = updateNote(noteID, {
        title: e.target.value,
    })
    timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
})

inputBody.addEventListener('input', (e) => {
    const matchedNote = updateNote(noteID, {
        body: e.target.value,
    })
    timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
})

removeBtn.addEventListener('click', (e) => {
    removeNote(noteID)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        initializeEditPage(noteID)
    }
})