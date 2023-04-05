window.onload = function () {
    const apiKey = '96a383b3c2088155d6eb3aff43966ac6';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const weatherContainer = document.getElementById('weather-container');
    const weatherOverlay = document.getElementById('weather-overlay');

    let locationButton = document.getElementById('location-btn');
    if (!locationButton) {
        locationButton = document.createElement('div');
        locationButton.id = 'location-btn';
        locationButton.style.top = '50%';
        locationButton.style.left = '50%';
        weatherOverlay.appendChild(locationButton);
    }

    const showWeatherInfo = data => {
        const temperature = data.main.temp;
        const conditions = data.weather[0].description;
        const city = data.name;
        document.getElementById('temperature').textContent = `${Math.round(
            temperature - 273.15
        )}°C`;
        document.getElementById('conditions').textContent = conditions;
        document.getElementById('city').textContent = city;
        weatherOverlay.classList.remove('show');
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.classList.add('show');
    };

    locationButton.onclick = () => {
        if (locationButton.style.transform === 'scale(1.2)') {
            const successCallback = position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const apiUrlWithLocation = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                fetch(apiUrlWithLocation)
                    .then(response => response.json())
                    .then(data => showWeatherInfo(data))
                    .catch(error => console.error(error));
            };
            const errorCallback = error => {
                console.error(error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Unable to retrieve your location';
                weatherContainer.appendChild(errorMessage);
                locationButton.remove();
            };
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            locationButton.style.pointerEvents = 'none';
            locationButton.classList.add('fade-out');
            setTimeout(() => {
                locationButton.style.display = 'none';
            }, 500);
        }
    };

    locationButton.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiUrlWithLocation = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            fetch(apiUrlWithLocation)
                .then(response => response.json())
                .then(data => {
                    showWeatherInfo(data);
                    locationButton.style.transition = 'opacity 0.1s';
                    locationButton.style.opacity = '0';
                    locationButton.style.pointerEvents = 'none';
                    locationButton.classList.remove('fade-out');
                })
                .catch(error => console.error(error));
        }, error => {
            console.error(error);
        });
    });
};