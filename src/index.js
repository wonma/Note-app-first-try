import { createNote } from './notes'
import { setFilters } from './filters'
import { renderList } from './views'

const searchEl = document.querySelector('#search-input')
const sortEl = document.querySelector('#sort-by')
const createEl = document.querySelector('#create-note')

renderList()


searchEl.addEventListener('input', (e) => {
    setFilters({
        searchWord: e.target.value
    })
    renderList()
})


sortEl.addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderList()
})


createEl.addEventListener('click', (e) => {
    const newId = createNote()
    location.assign(`/edit.html#${newId}`)
})


window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderList()
    }
})
