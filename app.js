const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const cityError = document.getElementById('cityError');
const weatherResults = document.getElementById('weatherResults');

const API_KEY = "d245bfb0604ea58caf27324686a4d81a"; // clave de OpenWeatherMap

let map; // Declaramos el mapa fuera del evento para usarlo globalmente

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

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Por favor, ingresa una ciudad.");
        return;
    } else {
        showError("");
    }

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
            // Crear la tabla dinámicamente
            const table = document.createElement('table');
            table.innerHTML = `
                <tr><th>Descripción</th><td>${data.weather[0].description}</td></tr>
                <tr><th>Temperatura</th><td>${data.main.temp} °C</td></tr>
                <tr><th>Humedad</th><td>${data.main.humidity}%</td></tr>
                <tr><th>Presión</th><td>${data.main.pressure} hPa</td></tr>
                <tr><th>Velocidad del viento</th><td>${data.wind.speed} m/s</td></tr>
                <tr><th>Latitud</th><td>${data.coord.lat}</td></tr>
                <tr><th>Longitud</th><td>${data.coord.lon}</td></tr>
            `;
            weatherResults.innerHTML = ''; // Limpiar resultados anteriores
            weatherResults.appendChild(table);

            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Si el mapa ya existe, restablecemos la vista, si no, lo creamos
            if (map) {
                map.setView([lat, lon], 12);
            } else {
                map = L.map('map').setView([lat, lon], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            }

            // Eliminamos marcadores previos y agregamos uno nuevo
            L.marker([lat, lon]).addTo(map)
                .bindPopup(city, 'marcador añadido')
                .openPopup();

            // Aseguramos que el tamaño del mapa sea correcto
            map.invalidateSize();

            hideLoadingIndicator();
        })
        .catch(error => {
            showError("Ciudad no encontrada o error en la API.");
            console.error(error);
            hideLoadingIndicator();
        });
});

