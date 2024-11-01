const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const cityError = document.getElementById('cityError');
const weatherResults = document.getElementById('weatherResults');
const weatherIcon = document.getElementById('weatherIcon');

const API_KEY = "d245bfb0604ea58caf27324686a4d81a"; // clave de OpenWeatherMap

let map; // Mapa global

function showError(message) {
    cityError.textContent = message;
}

function showLoadingIndicator() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.style.cssText = `
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    `;
    document.body.appendChild(loadingSpinner);
}

function hideLoadingIndicator() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        document.body.removeChild(loadingSpinner);
    }
}

// Cambiar tema y ícono según el clima
function updateThemeAndIcon(weather) {
    const body = document.body;

    // Remover clases de clima anteriores
    body.classList.remove('sunny', 'cloudy', 'rainy', 'stormy');
    
    const weatherClasses = {
        Clear: 'sunny',
        Clouds: 'cloudy',
        Rain: 'rainy',
        Thunderstorm: 'stormy'
    };

    // Aplicar la clase correspondiente
    const currentClass = weatherClasses[weather] || '';
    if (currentClass) {
        body.classList.add(currentClass);
    }
    weatherIcon.className = `fas ${currentClass ? weatherIcons[weather] : 'fa-question'}`; // Ícono por defecto si no coincide
}

// Íconos para cada estado climático
const weatherIcons = {
    Clear: 'fa-sun',
    Clouds: 'fa-cloud',
    Rain: 'fa-cloud-rain',
    Thunderstorm: 'fa-bolt'
};

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (!city) {
        showError("Por favor, ingresa una ciudad.");
        return;
    }
    showError("");

    showLoadingIndicator();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos del clima: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Cambiar tema e ícono según el clima
            updateThemeAndIcon(data.weather[0].main);

            // Crear la tabla de resultados
            const table = document.createElement('table');
            table.innerHTML = `
                <tr><th><i class="fas fa-cloud-sun weather-icon"></i>Descripción</th><td>${data.weather[0].description}</td></tr>
                <tr><th><i class="fas fa-thermometer-half weather-icon"></i>Temperatura</th><td>${data.main.temp} °C</td></tr>
                <tr><th><i class="fas fa-tint weather-icon"></i>Humedad</th><td>${data.main.humidity}%</td></tr>
                <tr><th><i class="fas fa-tachometer-alt weather-icon"></i>Presión</th><td>${data.main.pressure} hPa</td></tr>
                <tr><th><i class="fas fa-wind weather-icon"></i>Velocidad del viento</th><td>${data.wind.speed} m/s</td></tr>
                <tr><th><i class="fas fa-map-marker-alt weather-icon"></i>Latitud</th><td>${data.coord.lat}</td></tr>
                <tr><th><i class="fas fa-map-marker-alt weather-icon"></i>Longitud</th><td>${data.coord.lon}</td></tr>
            `;

            weatherResults.innerHTML = ''; // Limpiar resultados anteriores
            weatherResults.appendChild(table);

            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Actualizar el mapa
            if (map) {
                map.setView([lat, lon], 14);
            } else {
                map = L.map('map').setView([lat, lon], 14);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            }

            // Agregar un nuevo marcador
            L.marker([lat, lon]).addTo(map)
                .bindPopup(city, 'marcador añadido')
                .openPopup();

            map.invalidateSize(); // Ajustar tamaño del mapa
            hideLoadingIndicator();
        })
        .catch(error => {
            showError("Ciudad no encontrada.");
            console.error(error);
            hideLoadingIndicator();
        });
});
