document.addEventListener("DOMContentLoaded", function() {
    var text = "Welcome to Synork";
    var correctText = "Welcome to Synork";
    var i = 0;
    var h1 = document.querySelector("main h1");
    h1.innerHTML = "";
    function typeWriter() {
        if (i < text.length) {
            h1.innerHTML += text.charAt(i);
            i++;
            if (h1.innerHTML === "welcoome") {
                
                var j = h1.innerHTML.length - 1;
                var backspaceCount = 0;
                function backspace() {
                    if (backspaceCount < 3) {
                        h1.innerHTML = h1.innerHTML.slice(0, -1);
                        j--;
                        backspaceCount++;
                        setTimeout(backspace, 150); 
                    } else {
                        
                        h1.innerHTML = correctText;
                        i = correctText.length; 
                    }
                }
                backspace();
            } else {
                setTimeout(typeWriter, 150); 
            }
        }
    }
    typeWriter();
})

if ('webkitSpeechRecognition' in window) {
    const searchInput = document.getElementById('search-input');
    const voiceSearchButton = document.getElementById('voice-search-button');
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'hu-HU'; 
    recognition.onresult = function (event) {
        searchInput.value = event.results[0][0].transcript;
    };
    voiceSearchButton.addEventListener('click', function () {
        recognition.start();
    });
} else {
    document.getElementById('voice-search-button').style.display = 'none';
}


document.getElementById('image-search-button').addEventListener('click', function () {
    const imageUrl = prompt('URL:');
    if (imageUrl) {
        window.open('https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(imageUrl), '_blank');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const screensaver = document.getElementById('screensaver');
    const screensaverTime = document.getElementById('screensaver-time');
    const screensaverDate = document.getElementById('screensaver-date');
    const screensaverGreeting = document.getElementById('screensaver-greeting');
    const screensaverWeather = document.getElementById('screensaver-weather');

    let timeoutId;
    const inactivityTimeout = 40000; 

    function showScreensaver() {
        screensaver.style.display = 'flex';
    }

    function hideScreensaver() {
        screensaver.style.display = 'none';
    }

    function resetTimeout() {
        clearTimeout(timeoutId);
        hideScreensaver(); 
        timeoutId = setTimeout(showScreensaver, inactivityTimeout);
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
                            console.error('Túl sok kérés. Kérjük, várjon.');
                            screensaverWeather.textContent = 'Időjárás adatok nem elérhetők. Túl sok kérés.';
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
                                            Remember the current location is ${city}.
                                        `;
                                    } else {
                                        screensaverWeather.innerHTML = `
                                            <img src="${iconUrl}" alt="${description}"> ${description}, ${temperature}\u00B0C <br>
                                            Remember the current location is ${data.resolvedAddress}.
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
                        console.error('Időjárás lekérése sikertelen:', error);
                        screensaverWeather.textContent = 'Időjárás adatok nem elérhetők.';
                    });
            }, error => {
                console.error('Helymeghatározás sikertelen:', error);
                screensaverWeather.textContent = 'Helyadatok nem elérhetők.';
            });
        } else {
            screensaverWeather.textContent = 'Helyadatok nem elérhetők.';
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

    showScreensaver(); // Képernyőkímélő azonnali megjelenítése

    resetTimeout(); // Inaktivitási időzítő beállítása
    document.addEventListener('mousemove', resetTimeout); // Eseményfigyelő hozzáadása
    document.addEventListener('keypress', resetTimeout);
});