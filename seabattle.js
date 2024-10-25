$(document).ready(function() {
    let $game_grid =$('.game_grid');
    for(let i = 1; i <= 100; i++){
        const newGrid = `<div class ="grid-item" id = "g${i}" ></div>`;
        $game_grid.append(newGrid);
    }

    let $alphabet = $('.alphabet');
    for(let i = 0; i < 10; i++){
        let letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'
        const newAlph =  `<div class ="alphabet-item" id = "${letter}" >${letter}</div>`;
        $alphabet.append(newAlph);
    }

    let $numbers = $('.numbers');
    for(let i = 1; i <= 10; i++){
        const newNum = `<div class ="number" id = ${i} >${i}</div>`;
        $numbers.append(newNum);
    }

    //1칸 짜리 함선 랜덤 위치 ----------------------------------------
    let x, y, topPosition, leftPosition;
    let idSet = new Set();
    //랜덤 좌표가 들어갈 grid-item 아이디값
    while(idSet.size < 4){
        idSet.add(Math.floor((Math.random()*10) *10) + 1);
    }
    //아이디 값에 해당되는 div 요소 배열에 저장
    const idArr = Array.from(idSet);
    const gi_div = [];
    for(let i = 0; i < idArr.length; i++){
        const gi = $(`#g${idArr[i]}`);
        gi_div.push(gi);
    }
    //랜덤 좌표
    for(let i = 0; i < idArr.length; i++){
        x = Math.floor(Math.random()*8) * 50;
        y = Math.floor(Math.random()*8) * 50;
        topPosition = x;
        leftPosition = y;
        gi_div[i].css({
            top: topPosition + 'px',
            left: leftPosition + 'px',
        });
        gi_div[i].addClass('red');

        //함선 상하좌우로 다른 배가 위치되지 못하도록 만든다.
        if(Math.floor(`${idArr[i]}`)-10 > 0){
            let g_top =  Math.floor(`${idArr[i]}`)-10;
            const gi_top = $(`#g${g_top}`);
            gi_top.addClass('gray');
            gi_top.text('·');
        }

        if(Math.floor(`${idArr[i]}`)-1 > 0){
            let g_left =  Math.floor(`${idArr[i]}`)-1;
            const gi_left = $(`#g${g_left}`);
            gi_left.addClass('gray');
            gi_left.text('·');
        }

        if(Math.floor(`${idArr[i]}`)+1 % 10 != 0){
            let g_right =  Math.floor(`${idArr[i]}`)+1;
            const gi_right = $(`#g${g_right}`);
            gi_right.addClass('gray');
            gi_right.text('·');
        }

        if(Math.floor(`${idArr[i]}`)+10 < 101){
            let g_bottom =  Math.floor(`${idArr[i]}`)+10;
            const gi_bottom = $(`#g${g_bottom}`);
            gi_bottom.addClass('gray');
            gi_bottom.text('·');
        }
    }
});