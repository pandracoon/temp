var map;
var resultList;
var searchResultMarker = null;

function createMap(){
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.320701, 127.370667),
        level: 11
    };

    map = new kakao.maps.Map(container, options);
}

window.addEventListener("load", createMap);

function getLatLng(targetPlace) {
    X = targetPlace.x;
    Y = targetPlace.y;
    return new kakao.maps.LatLng(Y, X);
}

function setCenter(targetPlace) {
    var LatLon = getLatLng(targetPlace);
    map.setCenter(LatLon);
    map.setLevel(3);
}

function searchMapByKeyword(keyword) {
    var places = new kakao.maps.services.Places();

    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            displayItem(result);
            resultList = result;
        }else if(status === kakao.maps.services.Status.ZERO_RESULT) {
            addItem("검색 결과가 존재하지 않습니다.");
            return;
        }else if(status === kakao.maps.services.Status.ERROR) {
            addItem("검색 결과 중 오류가 발생했습니다.");
        }
    };

    places.keywordSearch(keyword, callback);
}

function moveMapByResultIndex(index) {
    setCenter(resultList[index]);
    makeMarkerCurrentPlace(resultList[index]);
}

function makeMarkerCurrentPlace(targetPlace){
    var LatLon = getLatLng(targetPlace);

    if(searchResultMarker != null) deleteMarker(searchResultMarker);

    searchResultMarker = new kakao.maps.Marker({
        position: LatLon
    });

    searchResultMarker.setMap(map);

    makeInfoWindowOnMarker(targetPlace, searchResultMarker);
}

function makeInfoWindowOnMarker(targetPlace, marker){
    var iwContent = makeContentInfoWindow(targetPlace);
    var iwRemovable = true;
    
    var infoWindow = new kakao.maps.InfoWindow({
        position: marker.getPosition(),
        content: iwContent,
        removable: iwRemovable
    });

    infoWindow.open(map, marker);
}

function makeContentInfoWindow(targetPlace){
    var content = document.createElement("div");

    var nameSpan = document.createElement("span");
    nameSpan.innerHTML = targetPlace.place_name;

    var addSpan = document.createElement("span");
    addSpan.innerHTML = targetPlace.road_address_name;

    var anchor = document.createElement("a");   
    var hrefAtt = document.createAttribute("href");
    hrefAtt.value = "#hello";
    anchor.setAttributeNode(hrefAtt);
    anchor.innerHTML = "새 관측지로 추가하기";

    content.appendChild(nameSpan);
    content.appendChild(document.createElement("br"));
    content.appendChild(addSpan);
    content.appendChild(document.createElement("br"));
    content.appendChild(anchor);

    return content;
}

function deleteMarker(marker){
    marker.setMap(null);

}

function deleteInfoWindow(){

}