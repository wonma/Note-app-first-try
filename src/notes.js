import uuidv4 from 'uuid/v4'
import moment from 'moment'

let diary = []

// Read existing notes from localStorage
const loadNotes = () => {
    const notesFromJSON = localStorage.getItem('notes') // 뭐든간에 일단 정보를 받아옴.

    try {  
        return notesFromJSON ? JSON.parse(notesFromJSON) : []
    } catch (e) {
        return []
    }
}

diary = loadNotes()


// Expose notes from module by function!!!
const getNotes = () => diary


// Save existing notes(obj array) at localStorage
const saveData = () => {
    localStorage.setItem('notes', JSON.stringify(diary))
}


// Export createNote function!!!
const createNote = () => {
    const newId = uuidv4()
    const createdTime = moment().valueOf()

    diary.push({
        id: newId,
        title: '',
        body: '',
        createdAt: createdTime,
        updatedAt: createdTime
    })

    saveData() // save at localStorage
    return newId
}

// Remove note
const removeNote = (id) => {
    const noteIndex = diary.findIndex((note) => note.id === id)
    diary.splice(noteIndex, 1)
    saveData()
}



// Sorting notes
const sorting = (filterKind) => {
    return diary.sort((a, b) => {
        if (filterKind === 'byRecency') { // timestamp가 큰것이 먼저왔음 좋겠음
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        } else if (filterKind === 'byEdition') { // timestamp가 큰것이 먼저왔음 좋겠음
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        } else if (filterKind === 'byAbc') {
            if (a.title.toLowerCase() < b.title.toLowerCase()) { // 작은cha가 먼저왔음 좋겠음
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 0
            } else {
                return 0
            }
        }
    })
}

const updateNote = (id, infoObj) => {
    const matchedNote = diary.find((note) => note.id === id)

    if (!matchedNote) {
        return 
    }

    if (typeof infoObj.title === "string") {
        matchedNote.title = infoObj.title
        matchedNote.updatedAt = moment().valueOf()
    }

    if (typeof infoObj.body === "string") {
        matchedNote.body = infoObj.body
        matchedNote.updatedAt = moment().valueOf()
    }

    saveData()

    return matchedNote
}

export { getNotes, saveData, createNote, removeNote, sorting, updateNote }