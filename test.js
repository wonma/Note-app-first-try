//-------------------------------  Date object  -------------------------------

// (1) 현재 시간과 특정 지정 시간(static)을 비교하기

const date = Date() // 이렇게하면 현재시간정보 'string'만 만들어낸다.
// console.log(date.getMonth()) 
// 오류남. 왜? Date()는 메소드에 접근가능한 '오브젝트'가 아님.

const now = new Date()
console.log(now)            // 결과는 같아보이지만 이것은 속성(method)에 접근이 가능한 'object'이다.
console.log(now.getMonth()) // 11월일 경우 10이라는 결과값이 나옴


// (2) 내가 살아온 날을 milliseconds로 산출하기

const date1 = new Date()                                // current moment
const date2 = new Date(1988, 5, 3, 12, 12, 12, 12)      // birth moment
const msIlived = (date1.getTime() - date2.getTime())    // get timestamp gap
console.log(msIlived)

// get, set, format 이용하여 내 생일 표시하기 
const bday = moment().year(1988).month(5).date(3)
console.log(bday.format('MMM Do, YYYY'))


//-------------------------------  Moment  -------------------------------


const now = moment()        // moment()는 현재시간에 대한 object 도출함
console.log(now.toString())
now.subtract(3, 'days').add(4, 'hours').minutes(0)
const nowFormatted = now.format('MMMM Do, ddd, YYYY')
const nowTimestamp = now.valueOf()

console.log(now.fromNow())
console.log(moment(nowTimestamp).toString())

// moment() 이게 기본 만드는 것임

// (1) obj.minute() : 해당 '분'을 출력
//     obj.minute(1) : 해당 '분' 부분만 1분으로 바꿈 
//     그 외 : year() hours() minutes() seconds()

// (2) obj.add(숫자, '단위')
//        .subtract(숫자, '단위')

// (3) obj.fromNow();  : 알아서 계산되어 나옴

// (4) obj.valueOf();   : Unix Timestamp(ms)
//     obj.unix();      : Unix Timestamp(s)

// (5) moment(timestampNum) : local에 저장된 정보가져와서 parse 