
function toggleMenu() {
    var nav = document.getElementById("NavBar");
    if (nav.className === "responsive") {
        nav.className = "";
    } else {
        nav.className = "responsive";
    }
}
;