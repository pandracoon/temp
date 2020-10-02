function Enter_Search(){
    if(event.keyCode == 13){
        var keyword = document.getElementById("searchKeyword").value;

    }
}

function addItem(str){
    var item = document.createElement("li");
    var anchor = document.createElement("a");
    var hrefAtt = document.createAttribute("href");
    hrefAtt.value = "#hello";
    anchor.setAttributeNode(hrefAtt);
    anchor.innerHTML = str;
    item.appendChild(anchor);
    document.getElementById("searchResult").appendChild(item);
}