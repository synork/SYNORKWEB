function toggleMenu() {
    console.log("toggleMenu() hívva");
    var nav = document.getElementById("myNavbar");
    nav.classList.toggle("responsive");
  }
  
  function toggleSettings() {
    console.log("toggleSettings() hívva");
    var settingsModal = document.getElementById("settings-modal");
    settingsModal.style.display = settingsModal.style.display === "block" ? "none" : "block";
  }
  
  function saveSettings(event) {
    console.log("saveSettings() hívva");
    var alwaysDropdown = document.getElementById("always-dropdown").checked;
    document.cookie = "alwaysDropdown=" + alwaysDropdown + "; path=/";
    console.log("Cookie beállítva: alwaysDropdown=" + alwaysDropdown);
    applySettings();
    event.stopPropagation(); // Eseménybuborékolás megakadályozása
  }
  
  function applySettings() {
    console.log("applySettings() hívva");
    var alwaysDropdown = getCookie("alwaysDropdown") === "true";
    console.log("Cookie értéke: alwaysDropdown=" + alwaysDropdown);
    var nav = document.getElementById("myNavbar");
  
    if (alwaysDropdown) {
      nav.classList.add("responsive");
      console.log("Menü megjelenítve");
    } else {
      nav.classList.remove("responsive");
      console.log("Menü elrejtve");
    }
  }
  
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  window.onload = function() {
    console.log("window.onload hívva");
    var alwaysDropdown = getCookie("alwaysDropdown") === "true";
    console.log("Cookie értéke window.onload-ban: alwaysDropdown=" + alwaysDropdown);
    if (alwaysDropdown) {
      applySettings();
    }
  };