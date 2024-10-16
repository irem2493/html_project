
let itemList = [];
let addBtn = document.getElementById("add");
addBtn.addEventListener("click",addItemList);

function addItemList(){
    let item = document.getElementById("item").value;
    if(item != null){
        itemList.push(item);
        document.querySelector("#item").value = "";
        document.querySelector("#item").focus();
    }
    showItemList();
}

function showItemList(){
    let list = "<ul>"
    for(let i = 0; i < itemList.length; i++){
        list += "<li>" + itemList[i] + "<span class = 'close' id = " + i + ">X</span></li>";
    }
    list += "</ul>";
    const $itemList = document.getElementById("itemList");
    $itemList.innerHTML = list;

    let closeBnt = document.querySelectorAll(".close");
    for(let i = 0; i < closeBnt.length; i++){
        closeBnt[i].addEventListener("click",removeItemList);
    }
}

function removeItemList(){
    let id = this.getAttribute("id");
    itemList.splice(id,1);
    showItemList();
}