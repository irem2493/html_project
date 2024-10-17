let lottoAutoNumbers = [];
let lottoAutoBnt = document.getElementById("lotto_auto_btn");
lottoAutoBnt.addEventListener("click", setAutoLotto);

let lottoBnt = document.querySelector("#lotto_number_btn");
lottoBnt.addEventListener("click",setLotto);

function setAutoLotto(){
    for(let i = 0; i < 6; i++){
        lottoAutoNumbers[i] = Math.floor(Math.random() * 45) + 1;
        for(let j = 0; j < i; j++){
            if(lottoAutoNumbers[j] == lottoAutoNumbers[i]) --i;
        }
    }

    for(let i = 0; i < lottoAutoNumbers.length-1; i++){
        for(let j = i; j < lottoAutoNumbers.length; j++){
            if(lottoAutoNumbers[j] < lottoAutoNumbers[i]){
                let tmp = lottoAutoNumbers[j];
                lottoAutoNumbers[j] = lottoAutoNumbers[i];
                lottoAutoNumbers[i] = tmp;
            }
        }
    }
    showLottoAutoNumbers();
}

function showLottoAutoNumbers(){
    let list = "<ul>"
    for(let i = 0; i < lottoAutoNumbers.length-1; i++){
        list += "<li>"+ lottoAutoNumbers[i] + "</li>";
    }
    list += "<li class = 'bonus'>+</li><li>"+lottoAutoNumbers[lottoAutoNumbers.length-1]+"</li> </ul>";
    let lottoBox = document.getElementById("lottoAutoBox").innerHTML = list;
}
const lottoNumbers = new Set();
function setLotto(){
   while(lottoNumbers.size < 6){
        let num = Math.floor(Math.random()*45)+1; //floor는 바닥이라는 뜻을 가짐, 내리겠다.
        lottoNumbers.add(num);
    }
    
    let lottoNums = Array.from(lottoNumbers);
    for(let i = 0; i < lottoNums.length-1; i++){
        for(let j = i; j < lottoNums.length; j++){
            if(lottoNums[j] < lottoNums[i]){
                let tmp = lottoNums[j];
                lottoNums[j] = lottoNums[i];
                lottoNums[i] = tmp;
            }
        }
    }
    showLottoNumbers(lottoNums);
    lottoBnt.disabled = true;
    lottoBnt.addEventListener('mouseenter',function(){this.style.pointerEvents = 'none';});

    let resulLottoBnt = document.querySelector('#result_lotto_bnt');
    resulLottoBnt.style.disply = 'block';
}

function showLottoNumbers(lottoNums){
    let list = "<ul>"
    for(let i = 0; i < lottoNums.length-1; i++){
        list += "<li>"+ lottoNums[i] + "</li>";
    }
    list += "<li class = 'bonus'>+</li><li>"+lottoNums[lottoNums.length-1]+"</li> </ul>";
    let lottoBox = document.getElementById("lottoBox").innerHTML = list;
}

let resultLottoBnt = document.querySelector('#result_lotto_bnt');
resultLottoBnt.addEventListener("click", resultLotto);

function resultLotto(){
    let lottoNums = Array.from(lottoNumbers);
    let find, bnous;
    find = bnous = 0;
    if(lottoNums.length > 0){
        for(let i = 0; i < lottoNums.length-1; i++){
            if(lottoNums[i] == lottoAutoNumbers[i]){
                find++;
            }
        }
        if(lottoNums[lottoNums.length-1] == lottoAutoNumbers[lottoNums.length-1])
            bnous++;
    }
    console.log(find);
    console.log(bnous);
    showResult(find, bnous);
}

function showResult(find, bnous){
    console.log(find + "--");
    console.log(bnous + "--");
    let result = document.querySelector('#result').style.disply = "block";
    let list;
    if(find < 3){
        list = "<li><span>꽝</span>입니다.</li>";
    }
    let lottoResult = document.querySelector('#lotto_result');
    lottoResult.innerHTML = list;
}