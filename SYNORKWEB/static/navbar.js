
function toggleMenu() {
    var nav = document.getElementById("myNavbar");
    if (nav.className === "responsive") {
        nav.className = "";
    } else {
        nav.className = "responsive";
    }
}


document.getElementById('google-apps-button').addEventListener('click', function() {
    var dropdown = document.getElementById('google-apps-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});