var map;

function createMap(){
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.320701, 127.370667),
        level: 11
    };

    map = new kakao.maps.Map(container, options);
}

window.addEventListener("load", createMap);

function setCenter(targetPlace) {
    X = targetPlace.x;
    Y = targetPlace.y;
    var LatLon = new kakao.maps.LatLng(Y, X);
    map.setCenter(LatLon);
    map.setLevel(3);
}

function searchMapByKeyword(keyword) {
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

function moveMapByAddress(address){
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function(result, status){
        if (status === kakao.maps.services.Status.OK) {
            setCenter(result[0]);
        }
    }

    geocoder.addressSearch(address, callback);
}