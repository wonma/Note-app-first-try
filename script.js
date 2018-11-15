let diary = getData()

const filters = {
    searchWord : '',
    sortKeyword : 'byRecency',
}


renderList(diary, filters)

// Event call - take search letters and render

searchInput.addEventListener('input', (e) => {
    filters.searchWord = e.target.value
    renderList(diary, filters)
})
'use strict'

sortBy.addEventListener('change', (e) => {
    filters.sortKeyword = e.target.value
    renderList(diary, filters)
})

createNote.addEventListener('click', (e) => {
    const newId = uuidv4()
    const createdTime = moment().valueOf()

    diary.push({
        id: newId,
        title: '',
        body: '',
        createdAt: createdTime,
        updatedAt: createdTime
    })
    saveData(diary)
    location.assign(`/edit.html#${newId}`)

})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        diary = JSON.parse(e.newValue)
    }
    renderList(diary, filters)
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
