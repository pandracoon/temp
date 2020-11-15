var config = {
    apiKey: "AIzaSyC_nF8DPz8cveMeR55xvSpA8g_kX5H_DSc",
    authDomain: "komap-2b1d2.firebaseapp.com",
    projectId: "komap-2b1d2",
    appId: "1:1086344242143:web:066c9fd1ba8d936b121a6a"
}

firebase.initializeApp(config);

var db = firebase.firestore();

// db.collection("users").add({
//     first: "JaeGun",
//     last: "cho",
//     born: 1999
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });