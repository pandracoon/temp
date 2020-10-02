function openNav() {
    document.getElementById("menuPage").style.width = "200px"
}

function openSearch(){
    document.getElementById("searchPage").style.width = "100%"
    document.getElementById("searchSet").style.display = "block"
}

function closeNav(view) {
    document.getElementById(view).style.width = "0";
    if(view == 'searchPage'){
        document.getElementById("searchSet").style.display = "none"
    }
}
