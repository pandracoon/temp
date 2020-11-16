var map;
var resultList;
var infMar;

const mapControlTools = class {
    static getLatLng(targetPlace) {
        var X, Y;   
        X = targetPlace.x;
        Y = targetPlace.y;
        return new kakao.maps.LatLng(Y, X);
    }
    
    static setCenter(targetPlace) {
        var LatLon = this.getLatLng(targetPlace);
        map.setCenter(LatLon);
        map.setLevel(3);
    }
}

const htmlMakeTools = class {
    static makeAttribute(type, name) {
        var att;
        att = document.createAttribute(type);
        att.value = name;
        return att;
    }

    static ifUndefined(str){
        if(str == undefined) return "없음";
        else return str;
    }
}

const InfoMarker = class {
    constructor(targetPlace){
        this.targetPlace = targetPlace;
        this.marker = this.getMarker(targetPlace);
        this.infoWindow = this.getInfoWindow(targetPlace);
    }

    getMarker(targetPlace){
        var ll = mapControlTools.getLatLng(targetPlace);
        var marker = new kakao.maps.Marker({
            position: ll
        });

        return marker;
    }

    getInfoWindow(targetPlace){
        var ll = mapControlTools.getLatLng(targetPlace);
        var iwContent = makeContentInfoWindow(targetPlace);
        
        var infoWindow = new kakao.maps.CustomOverlay({
            position: ll,
            content: iwContent
        });

        return infoWindow;
    }

    display(){
        this.marker.setMap(map);
        this.infoWindow.setMap(map);
    }

    vanish(){
        this.marker.setMap(null);
        this.infoWindow.setMap(null);
    }
}

function createMap(){
    var container = document.getElementById("map");
    var options = {
        center: new kakao.maps.LatLng(37.320701, 127.370667),
        level: 11
    };

    map = new kakao.maps.Map(container, options);
}

window.addEventListener("load", createMap);

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
    mapControlTools.setCenter(resultList[index]);

    if(typeof(infMar) == "object") infMar.vanish();

    infMar = new InfoMarker(resultList[index]);
    infMar.display();
}

function makeContentInfoWindow(targetPlace){
    var content = document.createElement("div");
    content.setAttributeNode(htmlMakeTools.makeAttribute("class", "wrap"));

    var infoDiv = document.createElement("div");
    infoDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "info"));

    var titleDiv = document.createElement("div");
    titleDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "title"));
    titleDiv.innerHTML = targetPlace.place_name;

    var bodyDiv = document.createElement("div");
    bodyDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "body"));

    var mainAddrDiv = document.createElement("div");
    mainAddrDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "mainAddr"));
    mainAddrDiv.innerHTML = htmlMakeTools.ifUndefined(targetPlace.road_address_name);

    var subAddrDiv = document.createElement("div");
    subAddrDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "subAddr"));
    subAddrDiv.innerHTML = "(우) " + htmlMakeTools.ifUndefined(targetPlace.zone_no) + " (지번) " + htmlMakeTools.ifUndefined(targetPlace.address_name);

    var num = 123;

    var linkDiv = document.createElement("div");
    var anchor = document.createElement("a");
    anchor.setAttributeNode(htmlMakeTools.makeAttribute("href", "new_Observatory.html?id=" + num));
    anchor.setAttributeNode(htmlMakeTools.makeAttribute("target", "_self"));
    linkDiv.setAttributeNode(htmlMakeTools.makeAttribute("class", "link"));
    anchor.innerHTML = "새 관측지 추가하기";
    linkDiv.appendChild(anchor);

    bodyDiv.appendChild(mainAddrDiv);
    bodyDiv.appendChild(subAddrDiv);
    bodyDiv.appendChild(linkDiv);

    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(bodyDiv);

    content.appendChild(infoDiv);

    return content;

    

    
    
    // var content = document.createElement("div");

    // var nameSpan = document.createElement("span");
    // nameSpan.innerHTML = targetPlace.place_name;

    // var addSpan = document.createElement("span");
    // addSpan.innerHTML = targetPlace.road_address_name;

    // var anchor = document.createElement("a");   
    // var hrefAtt = document.createAttribute("href");
    // hrefAtt.value = "#hello";
    // anchor.setAttributeNode(hrefAtt);
    // anchor.innerHTML = "새 관측지로 추가하기";

    // content.appendChild(nameSpan);
    // content.appendChild(document.createElement("br"));
    // content.appendChild(addSpan);
    // content.appendChild(document.createElement("br"));
    // content.appendChild(anchor);

    // return content;
}
