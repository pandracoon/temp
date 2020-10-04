window.addEventListener("load", getQueryString);

function getQueryString(){
    const queryString = window.location.search;
    const URLParms = new URLSearchParams(queryString);

    var id = URLParms.get("id");

    var printDiv = document.getElementById("print");
    printDiv.innerHTML = "아이디는" + id;
}