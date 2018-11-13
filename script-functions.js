const body = document.getElementsByTagName('body')
const removeAll = document.querySelector('#remove-all')
const createNote = document.querySelector('#create-note')
const searchInput = document.querySelector('#search-input')
const notes = document.querySelector('#notes')
const sortBy = document.querySelector('#sort-by')


// Get data from local Storage
const getData = function (notes) {
    const notesFromJSON = localStorage.getItem('notes')

    // 조건문 없이 아래와 같이 바로 let에 assign해버리면,
    // null 이라는 값이 diary에 배정되어버림.
    // 그렇게 되면, none.filter이렇게 되는데 이건 invalid함.
    // 왜냐면 [Array].filter 만 가능하거든. Array가 비어있는건 상관없고! 

    if (notesFromJSON !== null) {
        diary = JSON.parse(notesFromJSON)
    }
}

// Remove a note
const removeNote = function (id) {
    const idToRemove = diary.findIndex(function (note) {
        return note.id === id
    })
    diary.splice(idToRemove, 1)
}

// Generate DOM notes
const generateDOMnotes = function (filtered) {
    filtered.forEach(function (note) {
        const todoEl = document.createElement('div')
        const textEl = document.createElement('a')
        const buttonEl = document.createElement('button')

        // Generate button
        buttonEl.textContent = 'x'
        todoEl.appendChild(buttonEl)
        buttonEl.addEventListener('click', function () {
            removeNote(note.id)
            saveData(diary)
            renderList(diary)
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

// Event call - take search letters and render
const inputTakeNRender = function (e) {  
        filterKeyword.searchWord = e.target.value
        renderList(diary)
}

// Save data in local Storage
const saveData = function (dataName) {
    localStorage.setItem('notes', JSON.stringify(dataName))
}
