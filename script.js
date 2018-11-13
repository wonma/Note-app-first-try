let diary = [] 

getData(diary)

const filterKeyword = {
    searchWord : ''
}

const renderList = function (noteName) {
    const filteredList = noteName.filter(function (note) {
        return note.title.toLowerCase().includes(filterKeyword.searchWord)
    })
    notes.innerHTML = ''
    generateDOMnotes(filteredList)
}

renderList(diary)

searchInput.addEventListener('input', inputTakeNRender)

sortBy.addEventListener('change', function (e) {
    console.log(e.target.value)
})

createNote.addEventListener('click', function (e) {
    const newId = uuidv4()
    diary.push({
        id: newId,
        title: '',
        body: ''
    })
    saveData(diary)
    location.assign(`/edit.html#${newId}`)

})





// 이미 HTML에 마크업된 p들을 remove-all버튼 통해서 전체 삭제하기
// removeAll.addEventListener('click', function (e) {
//     notes.forEach(function (note) {
//         note.remove()
//     })
// })
// result : didn't delete newly created notes.

// input 박스에 적용 가능한 이벤트들 : change, input
// e는 정보꾸러미 array라고보면됨.
// input.addEventListener('input', function (e) {
//     console.log(e.target.value)
// } )
