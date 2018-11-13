let diary = getData()

const filters = {
    searchWord : ''
}

const renderList = function (noteName, filterName) {
    const filteredList = noteName.filter(function (note) {
        return note.title.toLowerCase().includes(filterName.searchWord)
    })
    notes.innerHTML = ''
    generateDOMnotes(filteredList)
}

renderList(diary, filters)

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

window.addEventListener('storage', function (e) {
    if (e.key === 'notes') {
        diary = JSON.parse(e.newValue)
    }
    renderList(diary, filters)
})

// 현재 시간과 특정 지정 시간(static)을 비교하기

const date = Date() // 이렇게하면 현재시간정보 'string'만 만들어낸다.
console.log(date)
// console.log(date.getMonth()) // 오류남. 왜? Date()는 메소드에 접근가능한 오브젝트 형태가 아님.

const now = new Date()
console.log(now) // 위와 결과는 같아보이지만 이것은 속성(method)에 접근이 가능한 'object'이다.
console.log(now.getMonth()) // 11월일 경우 10이라는 결과값이 나옴

const date1 = new Date()
const date2 = new Date(1988, 5, 3, 12, 12, 12, 12)
const msIlived = (date1.getTime() - date2.getTime())
console.log(msIlived)
const msIlivedDate = new Date(msIlived)
console.log(msIlivedDate.getUTCFullYear())

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
