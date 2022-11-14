// 닌자코드의 길
// 아래와 같이 사용하면 작동하지 않습니다.
// const dq = document.querySelector;
// bind와 함게 사용해주어야 합니다.(메소드 내에 this가 document로 바인딩되어야 제대로 작동하게 되어 있습니다.)
// const dq = document.querySelector.bind(document);

// section
const loadingSection = document.querySelector(".cont-result-loading")
const resultSection = document.querySelector(".cont-result")
const modalSection = document.querySelector("#modal")

// button
const startButton = document.querySelector(".btn-exc")
const openButton = document.querySelector(".btn-go")
const closeButton = document.querySelector(".btn-close")
const shareButton = document.querySelector(".btn-share")

function cmaComma(obj) {
    var firstNum = obj.value.substring(0, 1); // 첫글자 확인 변수
    var strNum = /^[\,0-9]*$/; // 숫자와 , 만 가능
    var str = "" + obj.value.replace(/,/gi, ''); // 콤마 제거  /[^0-9]/gi;
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = str.indexOf(".", 0);
    var strArr = str.split('.');
    if (!strNum.test(obj.value)) {
        alert("숫자만 입력하십시오.\n\n특수문자와 한글/영문은 사용할수 없습니다.");
        obj.value = 1;
        obj.focus();
        return false;
    }
    while (regx.test(strArr[ 0 ])) {
        strArr[ 0 ] = strArr[ 0 ].replace(regx, "$1,$2");
    }
    if (bExists > -1) {
        obj.value = strArr[ 0 ] + "." + strArr[ 1 ];
    } else {
        obj.value = strArr[ 0 ];
    }
}

function commaSplit(n) {// 콤마 나누는 부분
    var txtNumber = '' + n;
    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = txtNumber.split('.');
    arrNumber[ 0 ] += '.';
    do {
        arrNumber[ 0 ] = arrNumber[ 0 ].replace(rxSplit, '$1,$2');
    }
    while (rxSplit.test(arrNumber[ 0 ]));
    if (arrNumber.length > 1) {
        return arrNumber.join('');
    } else {
        return arrNumber[ 0 ].split('.')[ 0 ];
    }
}

const rateValueConfine = document.querySelector("#inp-time")
rateValueConfine.addEventListener('keyup', (value) => {
    rateValueConfine.value = rateValueConfine.value.replace(/\D/g, '');
    if (rateValueConfine.value > 20) {
        rateValueConfine.value = 20;
    }
})



function calculate() {
    // console.log('1')
    // doc -> 자동완성
    // qs -> 자동완성
    const fieldValue = document.querySelector("#inp-field")
    const timeValue = document.querySelector("#inp-time")
    const monthValue = document.querySelector("#input-month")
    // console.log(fieldValue, timeValue)
    // console.log(fieldValue.value, timeValue.value)
    console.log(typeof (fieldValue.value))
    console.log(fieldValue.value)
    console.log(parseInt(fieldValue.value.replaceAll(',', '')))

    if (fieldValue.value === "") {
        alert("대출액을 입력해 주세요.")
        return
    } else if (monthValue.value === "") {
        alert("상환기간을 입력해 주세요.")
        return
    } else if (timeValue.value === "") {
        alert("대출이자율을 입력해 주세요.")
        return
    } else if (timeValue.value > "20") {
        alert("법정 최고금리는 20%입니다.")
        return
    }

    setTimeout(function () {
        const fieldResult = document.querySelector(".field-result")
        const timeResult = document.querySelector(".time-result")
        const sumResult = document.querySelector(".sumAll")

        resultSection.style.display = "block";

        timeResult.innerText = Math.floor((parseInt(fieldValue.value.replaceAll(',', '')) * timeValue.value) / 100 / 12).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        fieldResult.innerText = (parseInt(fieldValue.value.replaceAll(',', '')) + Math.floor((parseInt(fieldValue.value.replaceAll(',', ''))) * timeValue.value / 100 / 12) * parseInt(monthValue.value) * 12).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        sumResult.innerHTML = `${monthValue.value}년 `
    }, 0)
}

function copyUrl() {
    // console.log('4')
    // 3가지 방법
    // 1번째 : 구버전(이제는 잘 사용하지 않습니다.)
    // 2번째 : 신버전(Safari 13.1 버전부터 https 환경에서만 작동하는 코드)
    // 3번째 : clipboard.js 라이브러리 사용하는 방법

    // 1번
    // let url = window.location.href
    // console.log(url)

    // let temp = document.createElement('input')
    // temp.value = url
    // document.body.appendChild(temp)
    // temp.select()
    // document.execCommand("copy")
    // document.body.removeChild(temp)
    // alert("URL이 복사되었습니다.")

    // 2번
    // Navigator 인터페이스는 사용자 에이전트의 상태와 신원 정보를 나타내며, 스크립트로 해당 정보를 질의할 때와 애플리케이션을 특정 활동에 등록할 때 사용
    let url = window.location.href
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('URL이 복사되었습니다.')
        })
        .catch(err => {
            alert('URL이 복사되지 않았습니다. 호환되는 브라우저가 아닙니다.')
            console.log(err)
        })
}

startButton.addEventListener("click", calculate)
shareButton.addEventListener("click", copyUrl)

window.onclick = function (event) {
    if (event.target == modalSection) {
        closeModal()
    }
}