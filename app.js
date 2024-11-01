// Selecciona los elementos HTML necesarios para manipular el formulario y mostrar los resultados
const weatherForm = document.getElementById('weatherForm'); // Formulario para ingresar la ciudad
const cityInput = document.getElementById('city'); // Campo de texto para el nombre de la ciudad
const cityError = document.getElementById('cityError'); // Elemento para mostrar errores de ciudad no encontrada
const weatherResults = document.getElementById('weatherResults'); // Contenedor para los resultados del clima
const weatherIcon = document.getElementById('weatherIcon'); // Elemento para mostrar el ícono de clima actual

const API_KEY = "d245bfb0604ea58caf27324686a4d81a"; // Clave de API de OpenWeatherMap

let map; // Mapa global para mostrar ubicación de la ciudad

// Función para mostrar un mensaje de error en caso de ciudad no encontrada o problema con la consulta
function showError(message) {
    cityError.textContent = message;
}

// Función para mostrar un indicador de carga (spinner) mientras se obtienen los datos del clima
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

// Función para ocultar el indicador de carga una vez que se obtienen los datos del clima
function hideLoadingIndicator() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        document.body.removeChild(loadingSpinner);
    }
}

// Función para cambiar el tema y el ícono de la página según el clima obtenido
function updateThemeAndIcon(weather) {
    const body = document.body;

    // Remueve clases de clima previas para evitar conflictos
    body.classList.remove('sunny', 'cloudy', 'rainy', 'stormy');
    
    // Diccionario de clases de clima según el tipo de clima
    const weatherClasses = {
        Clear: 'sunny',
        Clouds: 'cloudy',
        Rain: 'rainy',
        Thunderstorm: 'stormy'
    };

    // Selecciona la clase correspondiente al clima actual y aplica a la página
    const currentClass = weatherClasses[weather] || '';
    if (currentClass) {
        body.classList.add(currentClass);
    }
    weatherIcon.className = `fas ${currentClass ? weatherIcons[weather] : 'fa-question'}`; // Ícono por defecto si no coincide el clima
}

// Diccionario de íconos para cada tipo de clima usando Font Awesome
const weatherIcons = {
    Clear: 'fa-sun',
    Clouds: 'fa-cloud',
    Rain: 'fa-cloud-rain',
    Thunderstorm: 'fa-bolt'
};

// Evento al enviar el formulario de consulta del clima
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene la recarga de la página

    const city = cityInput.value.trim();
    if (!city) {
        showError("Por favor, ingresa una ciudad."); // Muestra error si el campo está vacío
        return;
    }
    showError(""); // Borra cualquier error previo

    showLoadingIndicator(); // Muestra el indicador de carga

    // Construye la URL para consultar la API de OpenWeatherMap con la ciudad ingresada
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    // Consulta a la API para obtener los datos del clima
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos del clima: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Actualiza el tema e ícono de la página según el clima
            updateThemeAndIcon(data.weather[0].main);

            // Crea la tabla HTML con los resultados del clima
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

            weatherResults.innerHTML = ''; // Limpia resultados anteriores
            weatherResults.appendChild(table);

            // Extrae latitud y longitud para el mapa
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Actualiza el mapa con la ubicación de la ciudad consultada
            if (map) {
                map.setView([lat, lon], 13);
            } else {
                map = L.map('map').setView([lat, lon], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            }

            // Agrega un marcador en la ubicación de la ciudad en el mapa
            L.marker([lat, lon]).addTo(map)
                .bindPopup(city, 'marcador añadido')
                .openPopup();

            map.invalidateSize(); // Ajusta el tamaño del mapa
            hideLoadingIndicator(); // Oculta el indicador de carga
        })
        .catch(error => {
            showError("Ciudad no encontrada."); // Muestra error si no se encuentra la ciudad
            console.error(error);
            hideLoadingIndicator(); // Oculta el indicador de carga
        });
});
