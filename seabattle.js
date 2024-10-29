$(document).ready(function() {

    //grid 세팅
    let $game_grid =$('.game_grid');
    for(let i = 1; i <= 100; i++){
        const newGrid = `<div class ="grid-item" id = "g${i}" ></div>`;
        $game_grid.append(newGrid);
    }
    //그리드 윗부분의 알파벳 셋팅
    let $alphabet = $('.alphabet');
    for(let i = 0; i < 10; i++){
        let letter = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'
        const newAlph =  `<div class ="alphabet-item" id = "${letter}" >${letter}</div>`;
        $alphabet.append(newAlph);
    }
    //그리드 옆부분의 숫자 셋팅
    let $numbers = $('.numbers');
    for(let i = 1; i <= 10; i++){
        const newNum = `<div class ="number" id = ${i} >${i}</div>`;
        $numbers.append(newNum);
    }

    //1칸 짜리 함선 랜덤 위치 ----------------------------------------
    let idSet = new Set(); // 배의 위치값을 저장할 Set
    let surroundingSet= new Set(); // 배의 위치와 그 주변 좌표를 저장할 Set
    let maxPosition = 100; // 최대 위치값 (1부터 100까지)

    // 주어진 위치가 이미 사용 중인지 확인하는 함수
    function isOccupied(position, surroundingSet) {
        return surroundingSet.has(position) || 
            surroundingSet.has(position - 10) || 
            surroundingSet.has(position + 10) || 
            (position % 10 !== 1 && surroundingSet.has(position - 1)) || 
            (position % 10 !== 0 && surroundingSet.has(position + 1));
    }

    // 배 위치를 추가하는 함수
    function addShipPosition() {
        let attempts = 0; // 시도 횟수 초기화
        const maxAttempts = 50; // 최대 시도 횟수
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * maxPosition) + 1; // 랜덤 위치 생성
            if (++attempts >= maxAttempts) {
                console.error("Failed to find a valid position for one ship.");
                return false; // 최대 시도 초과 시 함수종료
            }
        } while (isOccupied(newPosition, surroundingSet));

        // 새로운 위치 추가
        idSet.add(newPosition);
        
        // 상하좌우 좌표를 surroundingSet에 추가
        markSurroundingPositions(newPosition, surroundingSet);
        return true;
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

    // 최대 반복 횟수를 설정
    let shipCount = 0; 
    // 총 4개의 배 위치 추가
    while (shipCount < 4) {
        if(addShipPosition()) shipCount++;
        else console.log("Retrying to add ship...");
    }

    
    //2칸 짜리 함선 랜덤 위치 ----------------------------------------
    // 배 위치를 추가하는 함수
    function addShipPosition2() {
        let attempts = 0; // 시도 횟수 초기화
        const maxAttempts = 50; // 최대 시도 횟수
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * maxPosition) + 1; // 랜덤 위치 생성
            if (++attempts >= maxAttempts) {
                console.error("Failed to find a valid position for double ship.");
                return false; // 최대 시도 초과 시 함수종료
            }
        } while (isOccupied(newPosition, surroundingSet));
    
        // 새로운 위치 추가
        idSet.add(newPosition);
    
        let direction;
        attempts = 0;
        do {
            direction = Math.floor(Math.random() * 4); // 0: 상, 1: 하, 2: 좌, 3: 우
            if (++attempts >= maxAttempts) {
                console.error("Failed to find a valid position for double ship.");
                return false; // 최대 시도 초과 시 함수종료
            }
        } while (!canPlace(newPosition, direction));
    
         // 2번째 좌표 추가
        let secondPosition;
        if (direction === 0) { // 상
            if( newPosition - 10 > 0) secondPosition = newPosition - 10;
        } else if (direction === 1) { // 하
            if(newPosition + 10 <= 100) secondPosition = newPosition + 10;
        } else if (direction === 2) { // 좌
            if(newPosition - 1 > 0)secondPosition = newPosition - 1;
        } else if (direction === 3) { // 우
            if(newPosition + 1 <= 100)secondPosition = newPosition + 1;
        }

        // idSet에 두 번째 좌표 추가
        idSet.add(secondPosition);

        // 주변 좌표 추가
        addSurroundingPositions(newPosition);
        addSurroundingPositions(secondPosition);

        return true;
    }
    
    function canPlace(position, direction) {
        switch (direction) {
            case 0: // 상
                return position > 10 && !isOccupied(position - 10, surroundingSet);
            case 1: // 하
                return position <= maxPosition - 10 && !isOccupied(position + 10, surroundingSet);
            case 2: // 좌
                return position % 10 !== 1 && !isOccupied(position - 1, surroundingSet);
            case 3: // 우
                return position % 10 !== 0 && !isOccupied(position + 1, surroundingSet);
            default:
                return false;
        }
    }
    
    function addSurroundingPositions(position) {
        // 상하좌우 및 대각선의 주변 좌표 추가
        const surroundingOffsets = [-11, -10, -9, -1, 1, 9, 10, 11]; // 대각선 포함
        surroundingOffsets.forEach(offset => {
            const surroundingPosition = position + offset;
            if (!isOccupied(surroundingPosition, surroundingSet) && surroundingPosition > 0 && surroundingPosition <= maxPosition) {
                surroundingSet.add(surroundingPosition);
            }
        });
    }
    
    let shipCount2 = 0; 
    while (shipCount2 < 3) { // 2칸짜리 함선 3개 추가
        if (addShipPosition2())  shipCount2++; // 성공적으로 추가된 경우 카운트 증가
         else console.log("Retrying to add ship 2...");
        
    }

    //3칸 짜리 함선 랜덤 위치 ---------------------------------------- 
    function addShipPosition3() {
        let attempts = 0;
        const maxAttempts = 50; // 최대 시도 횟수
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * maxPosition) + 1; // 랜덤 위치 생성
            if (++attempts >= maxAttempts) {
                console.error("Failed to find a valid position for the three ship.");
                return false; // 최대 시도 초과 시 함수 종료
            }
        } while (isOccupied(newPosition, idSet) || isOccupied(newPosition, surroundingSet));
    
        const direction = Math.floor(Math.random() * 6); // 방향 랜덤 결정
        let secondPosition, thirdPosition;
        let valid = false;
    
        const checkAndAddPositions = (pos1, pos2, pos3) => {
            if (!isOccupied(pos1, idSet) && !isOccupied(pos1, surroundingSet) &&
                !isOccupied(pos2, idSet) && !isOccupied(pos2, surroundingSet) &&
                !isOccupied(pos3, idSet) && !isOccupied(pos3, surroundingSet)) {
                
                idSet.add(pos1);
                idSet.add(pos2);
                idSet.add(pos3);
                addSurroundingPositions(pos1);
                addSurroundingPositions(pos2);
                addSurroundingPositions(pos3);
                valid = true;
            }
        };
        console.log(direction);
        // 각 방향에 따라 위치 계산
        switch (direction) {
            case 0: // 상
                if(newPosition - 10 > 0 && newPosition - 20 > 0){
                    secondPosition = newPosition - 10;
                    thirdPosition = newPosition - 20;
                    console.log(newPosition+'newPosition' + '상');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
            case 1: // 가로 중
                if(newPosition - 10 > 0 && newPosition+10 <= 100){
                    secondPosition = newPosition - 10;
                    thirdPosition = newPosition + 10;
                    console.log(newPosition+'newPosition' + '가로 중');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
            case 2: // 하
                if(newPosition + 10 < 100 && newPosition + 20 <= 100){
                    secondPosition = newPosition + 10;
                    thirdPosition = newPosition + 20;
                    console.log(newPosition+'newPosition' + '하');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
            case 3: // 좌
                if (newPosition % 10 !== 1 && newPosition - 1 > 0 && newPosition - 2 > 0) { // 첫 번째 열이 아닌 경우
                    secondPosition = newPosition - 1;
                    thirdPosition = newPosition - 2;
                    console.log(newPosition+'newPosition' + '좌');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
            case 4: // 세로 중
                if (newPosition % 10 !== 1 && newPosition % 10 !== 0 && newPosition - 1 > 0 && newPosition + 1 <= 100) { // 첫 번째와 마지막 열이 아닌 경우
                    secondPosition = newPosition - 1;
                    thirdPosition = newPosition + 1;
                    console.log(newPosition+'newPosition' + '세로 중');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
            case 5: // 우
                if (newPosition % 10 !== 0 && newPosition + 1 < 100 && newPosition + 2 <= 100) { // 마지막 열이 아닌 경우
                    secondPosition = newPosition + 1;
                    thirdPosition = newPosition + 2;
                    console.log(newPosition+'newPosition' + '우');
                    checkAndAddPositions(newPosition,secondPosition, thirdPosition);
                }
                break;
        }
    
        return valid;
    }
    let shipCount3 = 0;
    while(shipCount3 < 2){
        if(addShipPosition3()) shipCount3++;
        else console.log("Retrying to add ship 3...");
        console.log(shipCount3+"--------------shilpCount3");
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
         markSurrounding(id);
     });
 
     function markSurrounding(id) {
         // 상
         if (id - 10 > 0) markPosition(id - 10);
 
         // 좌
         if (id % 10 !== 1) markPosition(id - 1);
 
         // 우
         if (id % 10 !== 0) markPosition(id + 1);
 
         // 하
         if (id + 10 <= 100) markPosition(id + 10);
     }
 
     function markPosition(positionId) {
         const gi_position = $(`#g${positionId}`);
     
         // 함선이 있는 위치인지 확인
         if (!idArr.includes(positionId) && !gi_position.hasClass('gray')) {
             gi_position.addClass('gray').text('·'); // · 표시
         }
     }
});