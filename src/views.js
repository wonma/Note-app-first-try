import moment from 'moment'
import { getFilters } from './filters'
import { getNotes, removeNote, saveData, sorting } from './notes'

const notesListEl = document.querySelector('#notes')

// Generate DOM notes
const generateDOMnotes = (filtered) => {
    
    if (filtered.length <= 0) {  // filtered === [] 이렇게 했을 때 안됨  
        // const noteEl = document.createElement('a')
        const emptyMessageEl = document.createElement('p')
        emptyMessageEl.textContent = 'No note yet'   
        // noteEl.appendChild(emptyMessageEl)
        emptyMessageEl.classList.add('empty-message')
        notesListEl.appendChild(emptyMessageEl)     
        return 
    }

    filtered.forEach((note) => {

        const noteEl = document.createElement('a')
        const textEl = document.createElement('p')
        const statusEl = document.createElement('p')


        // Set up note title
        if (note.title.length > 0) {
            textEl.textContent = note.title  
        } else {
            textEl.textContent = 'Untitled'
        }
        textEl.classList.add('list-item__title')
        noteEl.appendChild(textEl) 

        // Set up status
        statusEl.textContent = generateLastEdited(note.updatedAt)
        statusEl.classList.add('list-item__subtitle')
        noteEl.appendChild(statusEl)

        // Set up the link
        noteEl.setAttribute('href', `/edit.html#${note.id}`)
        noteEl.classList.add('list-item')

        // Form the whole list
        notesListEl.appendChild(noteEl) 

        // -------------------------  Generate button  -------------------------
        // const buttonEl = document.createElement('button') // delete button
        // buttonEl.textContent = 'x'
        // noteEl.appendChild(buttonEl)
        // buttonEl.addEventListener('click', () => {
        //     removeNote(note.id) 
        //     renderList() 
        // })
    })
}

// Render notes
const renderList = () => {
    notesListEl.innerHTML = ''
    const filters = getFilters() 
    const sortedNotes = sorting(filters.sortBy) // assigning sorted array
    
    const filteredList = sortedNotes.filter((note) => note.title.toLowerCase().includes(filters.searchWord))
    
    // 나: 필터처리된 object 어레이를 아규먼트로 넣어서 DOM만들기 시행함. 마무리는 DOM만들기 기능에서 하도록 짬.
    generateDOMnotes(filteredList)

    // 샘: 필터된 array의 내용물이 있고 없고의 조건을 걸어서
    // 있으면 generateDOMnotes를 거쳐서 return된 결과물을 받아옴으로써, notesListEl에 붙여 마무리하고,
    // 없으면 내부에서 바로 element형성하고 텍스트넣어서 notesListEl에 붙여 마무리함.
    // 즉, 샘은 renderList라는 기능에 모든 과정을 넣고 중간에 잠깐 다른 기능을 끌어들였고,
    // 나는 linear하게 코딩해서, 형성된 내용물을 넘기고 넘기는 식으로 마무리함..!!!!!!

}

const initializeEditPage = (noteID) => {
    const inputTitle = document.querySelector('#edit-title')
    const inputBody = document.querySelector('#edit-body')
    const timeInfo = document.querySelector('#time-info')
    const diary = getNotes()   
    const matchedNote = diary.find((note) => note.id === noteID)

    if (!matchedNote) {
        location.assign('/index.html')
    }

    inputTitle.value = matchedNote.title
    inputBody.value = matchedNote.body
    timeInfo.textContent = generateLastEdited(matchedNote.updatedAt)
}


const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

export { generateDOMnotes, renderList, generateLastEdited, initializeEditPage }