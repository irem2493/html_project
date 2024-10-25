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
    let idSet = new Set(); // 배의 위치값을 저장할 Set
    let maxPosition = 100; // 최대 위치값 (1부터 100까지)

    // 주어진 위치가 이미 사용 중인지 확인하는 함수
    function isOccupied(position, surroundingSet) {
        return surroundingSet.has(position) || 
            surroundingSet.has(position - 10) || 
            surroundingSet.has(position + 10) || 
            (position % 10 !== 1 && surroundingSet.has(position - 1)) || 
            (position % 10 !== 0 && surroundingSet.has(position + 1));
    }
    let surroundingSet= new Set(); // 배의 위치와 그 주변 좌표를 저장할 Set
    console.log(surroundingSet);
    // 배 위치를 추가하는 함수
    function addShipPosition() {
        let newPosition;

        do {
            newPosition = Math.floor(Math.random() * maxPosition) + 1; // 랜덤 위치 생성
        } while (isOccupied(newPosition, surroundingSet));

        // 새로운 위치 추가
        idSet.add(newPosition);
        
        // 상하좌우 좌표를 surroundingSet에 추가
        markSurroundingPositions(newPosition, surroundingSet);
    }

    // 상하좌우 좌표를 마크하는 함수
    function markSurroundingPositions(position, surroundingSet) {
        surroundingSet.add(position); // 현재 배의 위치 추가
        if (position - 10 > 0) {
            surroundingSet.add(position - 10); // 상
        }
        if (position + 10 <= maxPosition) {
            surroundingSet.add(position + 10); // 하
        }
        if (position % 10 !== 1) {
            surroundingSet.add(position - 1); // 좌
        }
        if (position % 10 !== 0) {
            surroundingSet.add(position + 1); // 우
        }
    }

    // 총 4개의 배 위치 추가
    while (idSet.size < 4) {
        addShipPosition();
    }
    //아이디 값에 해당되는 div 요소 배열에 저장
    const idArr = Array.from(idSet);
    const gi_div = idArr.map(id => $(`#g${id}`)); // 배열 생성

    // 랜덤 좌표
        gi_div.forEach((gi, index) => {
        const x = Math.floor(Math.random() * 8) * 50;
        const y = Math.floor(Math.random() * 8) * 50;

        gi.css({ top: `${x}px`, left: `${y}px` });
        gi.addClass('red');

        // 주변 grid-item 상하좌우에 다른 배가 위치하지 못하도록 처리
        const id = idArr[index];

        // 상
        if (id - 10 > 0) {
            const gi_top = $(`#g${id - 10}`);
            if (!gi_top.hasClass('red')) { // 이미 x가 없는 경우에만 · 표시
                gi_top.addClass('gray').text('·'); // · 표시
            }
        }

        // 좌
        if (id % 10 !== 1) {
            const gi_left = $(`#g${id - 1}`);
            if (!gi_left.hasClass('red')) { // 이미 x가 없는 경우에만 · 표시
                gi_left.addClass('gray').text('·'); // · 표시
            }
        }

        // 우
        if (id % 10 !== 0) {
            const gi_right = $(`#g${id + 1}`);
            if (!gi_right.hasClass('red')) { // 이미 x가 없는 경우에만 · 표시
                gi_right.addClass('gray').text('·'); // · 표시
            }
        }

        // 하
        if (id + 10 <= 100) {
            const gi_bottom = $(`#g${id + 10}`);
            if (!gi_bottom.hasClass('red')) { // 이미 x가 없는 경우에만 · 표시
                gi_bottom.addClass('gray').text('·'); // · 표시
            }
        }
    });
});