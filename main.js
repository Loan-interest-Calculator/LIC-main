// section
const loadingSection = document.querySelector(".loading-img")
const modalSection = document.querySelector("#modal")


// 인풋입력값
const 대출금액 = document.querySelector('.inp-money')
const 대출기간 = document.querySelector('.inp-date')
const 대출이율 = document.querySelector('.inp-roan')


//Radio
const 만기일시상환 = document.querySelector("#first-radio")
const 원리균등상환 = document.querySelector("#second-radio")
const 원리금균등상환 = document.querySelector("#third-radio")

//Button
const calcButton = document.querySelector(".result-btn")
const ResetButton = document.querySelector(".reset-btn")


function 기간이자율제한함수() {
// input 제한 값
  if(대출금액.value === "") {
  alert("빈칸을 채워주세요")
  return false
  } else if (대출기간.value === ""){
  alert("빈칸을 채워주세요")
  return false
  }else if (대출이율.value === ""){
    alert("빈칸을 채워주세요")
    return false
  } else if (대출기간.value >= 60){
    alert("대출의 최장 기간은 60개월 입니다.")    
    return false
  } else if (대출이율.value >= 20){
    alert("2022년의 최고 이자율은 20% 입니다.")
    return false
  }else return true

}


//만기일시상환 -> 월납입원금 , 달마다 낼이자, 월상환금, 대출잔금




//원리균등상환 -> 월납입원금 , 달마다 낼이자, 월상환금, 대출잔금

function 원리계산최종 () {


  const 원리월납입원금계산 = function () {
    let 원리월납입금액 = Math.floor(parseInt(대출금액.value) / parseInt(대출기간.value))
    return 원리월납입금액
  }

  let 원리월납입금액최종 = 원리월납입원금계산()

  const 원리달이자계산 = function () {
    let 원리달이자금액 = Math.floor(Number(대출이율.value / 1200) * Number(대출금액.value))
    return 원리달이자금액
  }
  let 원리달이자금액최종 = 원리달이자계산()


  const 원리월합상환금계산 = function (원리달이자계산, 원리달이자금액) {
    let 원리월합상환금액 = 원리달이자계산 + 원리달이자금액
    return 원리월합상환금액
  }
  let 원리월합상환금액최종 = 원리월합상환금계산(원리월납입원금계산(),원리달이자계산())

  const 원리대출잔금계산 = function (원리월합상환금액최종) {
    let 원리대출잔금 = 대출금액.value - 원리월합상환금액최종
    return 원리대출잔금
  }

let 원리대출잔금최종 = 원리대출잔금계산(원리월합상환금액최종)

return [원리월납입금액최종,원리달이자금액최종, 원리월합상환금액최종, 원리대출잔금최종]
}




// 원리금균등상환 -> 월납입원금 , 달마다 낼이자, 월상환금, 대출잔금

function 원리금균등계산최종(회차) {


const 대출금액넘버 = Number(대출금액.value);
const 대출이율넘버 = Number(대출이율.value)/1200;
const 대출기간넘버 = Number(대출기간.value);

// 원리금월납입원금계산 ---

const 원리금월납입원금계산 = function () {
  원리금월납입금액 = (원리금월합상환금액 - (대출금액넘버*대출이율넘버)) * ((1+ 대출이율넘버)^(회차-1));
  return 원리금월납입금액;
}
let 원리금월납입금액최종 = 원리금월납입원금계산(대출기간넘버);

// 원리금달이자계산 ---

const 원리금달이자계산 = function (회차) {
  원리금달이자금액 = [대출금액넘버 - (((원리금월합상환금액-(대출금액넘버*대출이율넘버)) * (((1+대출이율넘버)**(회차-1))-1))/대출이율넘버)] * 대출이율넘버;
  return 원리금달이자금액;
}

let 원리금달이자금액최종 = 원리금달이자계산(회차);

// 원리금월합상환금계산 ---

const 원리금월합상환금계산 = function () {
  // 원리금월합상환금액 = Number(대출금액.value)*(Number(대출이율.value)/1200)*((1+(Number(대출이율.value)/1200))**Number(대출기간.value)) / ((1+(Number(대출이율.value)/1200))**Number(대출기간.value)) -1
  원리금월합상환금액 = (대출금액넘버*대출이율넘버*((1+대출이율넘버)**대출기간넘버)) / (((1+대출이율넘버)**대출기간넘버) -1);
  return 원리금월합상환금액;
}

let 원리금월합상환금액최종 = 원리금월합상환금계산();

const 원리금대출잔금계산 = function (회차) {
  원리금대출잔금 = 대출금액넘버 - (((원리금월합상환금액-(대출금액넘버*대출이율넘버)) * (((1+대출이율넘버)**(회차-1))-1))/대출이율넘버);
  return 원리금대출잔금액;
}

let 원리금대출잔금계산최종 = 원리금대출잔금계산(회차);


return [원리금월납입금액최종, 원리금달이자금액최종, 원리금월합상환금액최종, 원리금대출잔금계산최종];
}


// radio 클릭시 각 계산식

function 메인계산함수() {
        
      if (만기일시상환.checked === true) {
        let 원리계산최종값 = 원리계산최종(); 
          console.log()
        return 원리계산최종값
      } 
      else if (원리균등상환.checked === true) {
        let 원리계산최종값 = 원리계산최종(); 
        return 원리계산최종값
      }
      else if (원리금균등상환.checked === true) {
        let 원리계산최종값 = 원리계산최종(); 
        return 원리계산최종값
      }
  }


// 실행 버튼 눌렀을시에 로딩이미지 뜨며 그 후 테이블창 모달로 뜨는기능

function 실행버튼() {
loadingSection.style.display = "block";

setTimeout(function(){
  loadingSection.style.display = "none"
},2000);

  }

function tableModal() {
  setTimeout(function(){
    modalSection.style.display = "block";
  },2200);
}

function closeModal(){
  modalSection.style.display = "none";
}



// 인풋리셋

function 인풋리셋함수() {
  대출금액.value = "";
  대출기간.value = "";
  대출이율.value = "";
  만기일시상환.checked = false;
  원리균등상환.checked = false;
  원리금균등상환.checked = false;
}


const 회차테이블한줄만드는함수=(회차,납입금액,이자,월상환금,대출잔금)=>{
  const 한줄 = document.createElement("tr");
  const 회차칸 = document.createElement("td");
  회차칸.innerText = 회차
  const 납입금액칸 = document.createElement("td");
  납입금액칸.innerText = 납입금액
  const 이자칸 = document.createElement("td");
  이자칸.innerText = 이자
  const 월상환금칸 = document.createElement("td");
  월상환금칸.innerText = 월상환금
  const 대출잔금칸 = document.createElement("td");
  대출잔금칸.innerText = 대출잔금
  한줄.append(회차칸, 납입금액칸, 이자칸, 월상환금칸, 대출잔금칸)

  return 한줄

}


function 회차테이블만드는함수1(result) {
  console.log(result)
  const ele = document.querySelector("tbody");
  ele.innerHTML = ''
  for (let i =1; i <= Number(대출기간.value); i++){
    ele.append(회차테이블한줄만드는함수(i,...result))
  }
}

ResetButton.addEventListener("click",인풋리셋함수)
calcButton.addEventListener("click",(e)=> {
  console.log(e)
  if(기간이자율제한함수()){
    const result = 메인계산함수()
    실행버튼()
    tableModal()
    회차테이블만드는함수1(result)
    
  } else {
    기간이자율제한함수()
  }
})

window.addEventListener("click",closeModal)


