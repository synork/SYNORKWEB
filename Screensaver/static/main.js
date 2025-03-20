document.addEventListener('DOMContentLoaded', function() {
    const screensaver = document.getElementById('screensaver');
    const screensaverTime = document.getElementById('screensaver-time');
    const screensaverDate = document.getElementById('screensaver-date');
    const screensaverGreeting = document.getElementById('screensaver-greeting');
    const screensaverWeather = document.getElementById('screensaver-weather');

    function showScreensaver() {
        screensaver.style.display = 'flex';
    }

    function updateTime() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const now = new Date();
                const optionsTime = {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                const optionsDate = {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };
                screensaverTime.textContent = now.toLocaleTimeString('hu-HU', optionsTime);
                screensaverDate.textContent = now.toLocaleDateString('hu-HU', optionsDate);
            }, error => {
                console.error('Helymeghatározás sikertelen:', error);
                const now = new Date();
                screensaverTime.textContent = now.toLocaleTimeString('hu-HU', { hour12: false });
                screensaverDate.textContent = now.toLocaleDateString();
            });
        } else {
            const now = new Date();
            screensaverTime.textContent = now.toLocaleTimeString('hu-HU', { hour12: false });
            screensaverDate.textContent = now.toLocaleDateString();
        }
    }

    function updateWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const apiKey = 'D9TU29P8EB8N5CDXLCRK26Q5K';
                const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`;

                fetch(url)
                    .then(response => {
                        if (response.status === 429) {
                            console.error('weather data is not available. Too many requests. Please wait.');
                            screensaverWeather.textContent = 'weather data is not available. Too many requests. Please wait.';
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {
                        if (data) {
                            const temperature = data.currentConditions.temp;
                            const description = data.currentConditions.conditions;
                            const iconName = data.currentConditions.icon;
                            const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${iconName}.svg`;

                            const geocodingApiKey = '4179c651c90346bc95d23e9effbf9da0';
                            const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${data.latitude}+${data.longitude}&key=${geocodingApiKey}`;

                            fetch(geocodingUrl)
                                .then(geocodingResponse => geocodingResponse.json())
                                .then(geocodingData => {
                                    if (geocodingData.results && geocodingData.results.length > 0) {
                                        const city = geocodingData.results[0].components.city || geocodingData.results[0].components.town || geocodingData.results[0].components.village;
                                        screensaverWeather.innerHTML = `
                                            <img src="${iconUrl}" alt="${description}"> ${description}, ${temperature}\u00B0C <br>
                                            The current location is ${city}.
                                        `;
                                    } else {
                                        screensaverWeather.innerHTML = `
                                            <img src="${iconUrl}" alt="${description}"> ${description}, ${temperature}\u00B0C <br>
                                            The current location is ${data.resolvedAddress}.
                                        `;
                                    }
                                })
                                .catch(geocodingError => {
                                    console.error('Geokódolás sikertelen:', geocodingError);
                                    screensaverWeather.innerHTML = `
                                        <img src="${iconUrl}" alt="${description}"> ${description}, ${temperature}\u00B0C <br>
                                        Remember the current location is ${data.resolvedAddress}.
                                    `;
                                });
                        }
                    })
                    .catch(error => {
                        console.error('weather data is not available', error);
                        screensaverWeather.textContent = 'weather data is not available.';
                    });
            }, error => {
                console.error('location data is not avaible', error);
                screensaverWeather.textContent = 'location data is not available.';
            });
        } else {
            screensaverWeather.textContent = 'location data is not available.';
        }
    }

    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        let greeting = 'Good ';
        if (hour < 12) {
            greeting += 'Morning';
        } else if (hour < 18) {
            greeting += 'Afternoon';
        } else {
            greeting += 'Evening';
        }
        screensaverGreeting.textContent = greeting;
    }

    setInterval(updateTime, 1000); 
    setInterval(updateWeather, 600000); 
    setInterval(updateGreeting, 60000); 

    updateTime();
    updateWeather();
    updateGreeting();   
    showScreensaver();
    
    
var iamges = [
    "images/",
    "kep2.jpg",
    "kep3.jpg",
    "kep4.jpg",
    "kep5.jpg"
  ];
  
  
  function randomizator() {
    var veletlenIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
  
  function showImages() {
    var imagesPath = randomizator();
    var imagesThing = document.createElement("img");
    imagesThing.src = imagesPath;
    document.getElementById("images").appendChild(imagesThing);
  }
  
  
  window.onload = function() {
    for (var i = 0; i < 3; i++) { 
      showImages();
    }
  };
});