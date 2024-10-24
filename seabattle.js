$(document).ready(function() {
    let $game_grid =$('.game_grid');
    for(let i = 1; i <= 100; i++){
        const newGrid = `<div class ="grid-item" id = ${i} ></div>`;
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
});