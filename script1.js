let user;
let winCnt, loseCnt, drawCnt, totalCnt;
winCnt = loseCnt = drawCnt = totalCnt= 0;
function selectSissor(){
    const u =  document.getElementById("user");
    u.setAttribute("src", "./images/sissor.png");
    document.getElementById("explain").innerHTML = "";
    user = 1;
    compare(user);
}

function selectRock(){
    const u =  document.getElementById("user");
    u.setAttribute("src", "./images/rock.png");
    user = 2;
    compare(user);
}

function selectPaper(){
    const u =  document.getElementById("user");
    u.setAttribute("src", "./images/paper.png");
    user = 3;
    compare(user);
}


function reset(){
    let c = document.getElementById("com");
    c.setAttribute("src", "./images/rocksissorpaper.png");
    const u =  document.getElementById("user");
    u.setAttribute("src", "./images/rocksissorpaper.png");
    document.getElementById("explain").innerHTML = "가위바위보 중에 선택하시면 게임을 시작하실 수 있습니다!";
    document.getElementById("result").innerHTML = "";
    document.getElementById("cnt").innerHTML = "";
    document.getElementById("winnig").innerHTML ="";
    winCnt = loseCnt = drawCnt = totalCnt= 0;
}

function compare(user){
    com = Math.floor(Math.random() * 3) + 1;
    let rst = user-com;
    if(rst == -1 || rst == 2) {
        showCom();
        document.getElementById("result").innerHTML = "Lose";
        loseCnt++;
    }
    else if(rst == 1 || rst == -2){
        showCom();
        document.getElementById("result").innerHTML = "Win";
        winCnt++;
    }
    else {
        showCom();
        document.getElementById("result").innerHTML = "Draw";
        drawCnt++;
    }
    winning = winCnt/(winCnt + drawCnt + loseCnt) *100 ;
    document.getElementById("cnt").innerHTML = "Win Count : " + winCnt + ", Draw Count : " + drawCnt + ", Lose Couont : " + loseCnt;
    document.getElementById("winnig").innerHTML = "Winning : " + formatNumber(winning) + "%";
}

function showCom(){
    let c;
    if(com == 1){
        c =  document.getElementById("com");
        c.setAttribute("src", "./images/sissor.png");
    }else if(com == 2){
        c =  document.getElementById("com");
        c.setAttribute("src", "./images/rock.png");
    }else{
        c =  document.getElementById("com");
        c.setAttribute("src", "./images/paper.png");
    }
}

function formatNumber(winning) {
    // 소수점 이하 두 자리까지 표현
    const formatted = winning.toFixed(2);

    // 정수인 경우 소수점 제거
    return Number.isInteger(winning) ? formatted.split('.')[0] : formatted;
}