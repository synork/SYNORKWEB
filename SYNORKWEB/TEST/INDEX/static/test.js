function saveSettings() {
    console.log("saveSettings() hívva");
    var alwaysDropdown = document.getElementById("always-dropdown").checked;
    document.cookie = "alwaysDropdown=" + alwaysDropdown + "; path=/";
    console.log("Cookie beállítva: alwaysDropdown=" + alwaysDropdown);
    console.log("Cookie értéke: " + document.cookie); // Ellenőrizzük a cookie értékét
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
  };