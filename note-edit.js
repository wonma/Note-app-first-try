const noteID = location.hash.substring(1)
let diary = getData()   // has the same const name as one in main script file but it's ok
const inputTitle = document.querySelector('#edit-title')
const inputBody = document.querySelector('#edit-body')
const timeInfo = document.querySelector('#time-info')
const removeBtn = document.querySelector('#edit-remove')
let matchedNote = diary.find(function (note) {
    return note.id === noteID
})
// const matchedNoteIndex = diary.findIndex(function (note) {
//     return note.id === noteID
// })

if (matchedNote === undefined) {
    location.assign('/index.html')
}

inputTitle.value = matchedNote.title
inputBody.value = matchedNote.body
timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)


inputTitle.addEventListener('input', function(e) {
    matchedNote.title = e.target.value
    matchedNote.updatedAt = moment().valueOf()
    saveData(diary)
    timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
})

inputBody.addEventListener('input', function (e) {
    matchedNote.body = e.target.value
    matchedNote.updatedAt = moment().valueOf()
    saveData(diary)
    timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
})

removeBtn.addEventListener('click', function (e) {
    // removeNote function already exists.
    // didn't need to code the below.
    // diary.splice(matchedNoteIndex, 1)
    removeNote(matchedNote.id, diary)
    saveData(diary)
    location.assign('/index.html')
})

window.addEventListener('storage', function (e) {
    if(e.key === 'notes') {
        diary = JSON.parse(e.newValue)
        matchedNote = diary.find(function (note) {
            return note.id === noteID
        })
        if (matchedNote === undefined) {
            location.assign('/index.html')
        }
        inputTitle.value = matchedNote.title
        inputBody.value = matchedNote.body
        timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
    }
})