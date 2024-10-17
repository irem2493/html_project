let lottoAutoNumbers = [];
let lottoAutoBnt = document.getElementById("lotto_auto_btn");
lottoAutoBnt.addEventListener("click", setAutoLotto);

let lottoBnt = document.querySelector("#lotto_number_btn");
lottoBnt.addEventListener("click",setLotto);

function setAutoLotto(){
    for(let i = 0; i < 7; i++){
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
   while(lottoNumbers.size < 7){
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
    resulLottoBnt.style.display = 'block';
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
console.log(lottoNums);
console.log(lottoAutoNumbers);

    let find, bnous;
    find = bnous = 0;
    console.log(lottoNums.length);
    console.log(lottoAutoNumbers.length);
    if(lottoNums.length > 0){
        for(let i = 0; i < lottoAutoNumbers.length; i++){
            for(let j = 0; j < lottoNums.length-1; j++){
                if(lottoNums[i] === lottoAutoNumbers[j]) find++;
            }
        }
        for(let j = 0; j < lottoAutoNumbers.length; j++){
            if(lottoNums[lottoNums.length-1] === lottoAutoNumbers[j]) bnous++;
        }
    }
    showResult(find, bnous);
}

function showResult(find, bnous){
    console.log(find + "--f");
    console.log(bnous + "--b");
    let result = document.querySelector('#result');
    result.style.disply = "block";
    let lottoResultArea = document.querySelector('#lotto_result');
    lottoResultArea.style.display = 'flex';
    let list = "<ul>";
    if(find === 3)  list += "<li><span>5등 당첨</span>입니다.</li>";
    else if(find === 2 && bnous ===1) list += "<li><span>5등 당첨</span>입니다.</li>";
    else if(find == 4) list += "<li><span>4등 당첨</span>입니다.</li>";
    else if(find === 3 && bnous ===1) list += "<li><span>4등 당첨</span>입니다.</li>";
    else if(find == 5) list = "<li><span>3등 당첨</span>입니다.</li>";
    else if(find == 4 && bnous ===1) list += "<li><span>3등 당첨</span>입니다.</li>";
    else if(find == 6) list += "<li><span>1등 당첨</span>입니다.</li>";
    else if(find == 5 && bnous == 1) list += "<li><span>2등 당첨</span>입니다.</li>";
    else list += "<li><span>꽝</span>입니다.</li>";
    list += "</ul>";
    console.log(list);
    let lottoResult = document.querySelector('#lotto_result');
    lottoResult.innerHTML = list;
}