function Enter_Search(){
    if(event.keyCode == 13){
        var keyword = document.getElementById("searchKeyword").value;
        deleteItems();
        searchMap(keyword);
    }
}

function searchMap(keyword) {
    var places = new kakao.maps.services.Places();

    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            displayItem(result);
        }else if(status === kakao.maps.services.Status.ZERO_RESULT) {
            addItem("검색 결과가 존재하지 않습니다.");
            return;
        }else if(status === kakao.maps.services.Status.ERROR) {
            addItem("검색 결과 중 오류가 발생했습니다.");
        }
    };

    places.keywordSearch(keyword, callback);
}

function selectItem(event){
    var target = event.target;
    var address = target.childNodes[2].innerHTML;
    console.log(target);
}

function displayItem(result){
    for(var i = 0; i < result.length; ++i){
        if(i > 7) break;
        addItem(result[i].place_name, result[i].road_address_name);
    }
}

function addItem(name, address){
    var item = document.createElement("li");
    var anchor = document.createElement("a");
    var hrefAtt = document.createAttribute("href");
    hrefAtt.value = "#hello";
    anchor.setAttributeNode(hrefAtt);

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
    anchor.addEventListener("onclick", selectItem);

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