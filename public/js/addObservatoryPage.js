window.addEventListener("load", getQueryString);

function getQueryString(){
    const queryString = window.location.search;
    const URLParms = new URLSearchParams(queryString);

    var ids = URLParms.get("id");

    var printDiv = document.getElementById("print");
    printDiv.innerHTML = "아이디는" + ids;

    
    db.collection("users").add({
        first: "JaeGun",
        last: "cho",
        id: ids
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}