function Enter_Search(){
    if(event.keyCode == 13){
        var keyword = document.getElementById("searchKeyword").value;
        deleteItems();
        searchMapByKeyword(keyword);
    }
}

function selectItem(event){
    var target = event.target;
    var index = parseInt(target.getAttribute("id"));
    closeNav('searchPage');
    moveMapByResultIndex(index);
}

function displayItem(result){
    for(var i = 0; i < result.length; ++i){
        if(i > 7) break;
        addItem(result[i], i);
    }
}

function addItem(targetPlace, i){
    var name = targetPlace.place_name;
    var address = targetPlace.road_address_name;

    var item = document.createElement("li");
    var anchor = document.createElement("a");
    var hrefAtt = document.createAttribute("href");
    var index = document.createAttribute("id");
    hrefAtt.value = "#hello";
    index.value = String(i) + "list";
    anchor.setAttributeNode(hrefAtt);
    anchor.setAttributeNode(index);

    var nameSpan = document.createElement("span");
    var addSpan = document.createElement("span");
    nameSpan.innerHTML = name;
    addSpan.innerHTML = address;
    var addSpanClass = document.createAttribute("class");
    addSpanClass.value = "address";
    addSpan.setAttributeNode(addSpanClass);

    anchor.appendChild(nameSpan);
    anchor.appendChild(document.createElement("br"));
    anchor.appendChild(addSpan);
    anchor.addEventListener("click", selectItem);
    
    //아이콘 추가 시, css는 있으므로 잘 넣어주면 됨.

    item.appendChild(anchor);

    document.getElementById("searchResult").appendChild(item);
}

function deleteItems(){
    var prevResult = document.getElementById("searchResult").childNodes;
    var size = prevResult.length;

    for(var i = 0; i < size; ++i){
        document.getElementById("searchResult").removeChild(prevResult[0]);
    }
}