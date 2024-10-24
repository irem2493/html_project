$(document).ready(function() {
    let $game_grid =$('.game_grid');
    for(let i = 1; i <= 100; i++){
        const newGrid = `<div class ="grid-item" id = "${i}" ></div>`;
        $game_grid.append(newGrid);
    }
});