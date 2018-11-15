'use strict'

const body = document.getElementsByTagName('body')
const removeAll = document.querySelector('#remove-all')
const createNote = document.querySelector('#create-note')
const searchInput = document.querySelector('#search-input')
const notes = document.querySelector('#notes')
const sortBy = document.querySelector('#sort-by')


// Get data from local Storage
const getData = () => {
    const notesFromJSON = localStorage.getItem('notes') // 뭐든간에 일단 정보를 받아옴.

    // 조건문 없이 아래와 같이 바로 let에 assign해버리면,
    // null 이라는 값이 diary에 배정되어버림.
    // 그렇게 되면, null.filter이렇게 되는데 이건 invalid함.
    // 왜냐면 [Array].filter 만 가능하거든. Array가 비어있는건 상관없고! 

    // 내가한것 
    // if (notesFromJSON !== null) {
    //     diary = JSON.parse(notesFromJSON)
    // }

    // 샘이 한 것. return으로 끝을 냄으로서 다른 reusable하게 만들었음
    // if (notesFromJSON !== null) {
    //     return JSON.parse(notesFromJSON)
    // } else {
    //     return []
    // }
    try {  // 아래를 시행하다가 에러가 나면 catch 블록을 대체용으로 실행하고 crash 시키지 않음.
        return notesFromJSON ? JSON.parse(notesFromJSON) : []
    } catch(e) {
        return []
    }
}


// Sorting notes
const sorting = (diaryName, filterKind) => {
    return diaryName.sort((a, b) => {
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

// Render notes
// renderList기계에 'filterName' arg 꼭 필요함
// filters 오브젝트의 searchWord 값을 받아와야하기때문
const renderList = (noteName, filters) => {
    noteName = sorting(diary, filters.sortKeyword) // getting sorted array

    const filteredList = noteName.filter((note) => note.title.toLowerCase().includes(filters.searchWord))
    notes.innerHTML = ''
    generateDOMnotes(filteredList)
}



// Remove a note
const removeNote = (id, noteName) => {
    const idToRemove = noteName.findIndex((note) => note.id === id)
    noteName.splice(idToRemove, 1)
}

// Generate DOM notes
const generateDOMnotes = (filtered) => {
    filtered.forEach((note) => {
        const todoEl = document.createElement('div')
        const textEl = document.createElement('a')
        const buttonEl = document.createElement('button')

        // Generate button
        buttonEl.textContent = 'x'
        todoEl.appendChild(buttonEl)
        buttonEl.addEventListener('click', () => {
            removeNote(note.id, diary)
            saveData(diary)
            renderList(diary, filters)
        })

        // Generate title
        // 제목없이 create제출될 경우 안내메세지 나오도록해줌
        // 만약 그냥 p.textContent = note.title 이걸 넣었으면,
        // textContent가 없는 <p></p>가 render됨
        if (note.title.length > 0) {
            textEl.textContent = note.title
        } else {
            textEl.textContent = 'Untitled'
        }
        textEl.setAttribute('href', `/edit.html#${note.id}`)
        todoEl.appendChild(textEl)

        // Generate one todo
        notes.appendChild(todoEl)
    })
}



// Save data in local Storage
const saveData = (dataName) => {
    localStorage.setItem('notes', JSON.stringify(dataName))
}


// Generate last edited function (내가한 것)
//
// const timeInfo = document.querySelector('#time-info')
// const generateLastEdited = (note) => {
//     const lastTimestamp = note.updatedAt
//     timeInfo.textContent = `Last edited ${moment(lastTimestamp).fromNow()}`
// }

// 샘이한것
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
