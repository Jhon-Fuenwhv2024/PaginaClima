Proyecto de Consulta de Clima 🌤️
Este proyecto permite al usuario obtener información meteorológica en tiempo real de cualquier ciudad ingresada, 
visualizando detalles como temperatura, humedad, velocidad del viento, entre otros. 
También cambia su tema visual dependiendo del clima consultado, ofreciendo una experiencia interactiva y visualmente atractiva.

Contenido
Características
Tecnologías Utilizadas
Instalación y Configuración
Uso
Estructura del Proyecto
Funciones Clave
Futuras Mejoras
Características
Consulta de datos meteorológicos en tiempo real mediante la API de OpenWeatherMap.
Interfaz moderna, con diseño responsive.
Cambio de tema de acuerdo al clima (claro, oscuro, nublado, etc.)
Mapas interactivos que muestran la ubicación geográfica de la ciudad consultada.
Tecnologías Utilizadas
HTML/CSS/JavaScript: para la estructura, el estilo y la interactividad en el cliente.
OpenWeatherMap API: para obtener los datos meteorológicos.
Leaflet.js: para integrar y visualizar mapas interactivos.
Instalación y Configuración
Clonar el repositorio:

bash
Copiar código
git clone [https://github.com/Jhon-Fuenwhv2024/PaginaClima.git]
cd [PaginaClima]
Configurar API Key:

Crea una cuenta en OpenWeatherMap y obtén tu API key.

Inserta tu clave en el script app.js en el lugar correspondiente:

javascript
Copiar código
const API_KEY = "AQUI_LA_CLAVE_DE_LA_API";
Ejecuta el proyecto abriendo index.html en el navegador.

Uso
Ingresa el nombre de la ciudad en el formulario y presiona "Consultar".
La página se actualizará con la información del clima, incluyendo:
Descripción
Temperatura
Humedad
Presión
Velocidad del viento
La ubicación de la ciudad también se mostrará en el mapa interactivo debajo de los resultados.
Estructura del Proyecto

├── index.html          # Página principal con el formulario y los resultados
├── style.css           # Archivo CSS que define estilos y temas
├── app.js              # Lógica JavaScript para manejar API y temas de clima
└── README.md           # Documentación del proyecto
Funciones Clave
cambiarTemaPorClima(weather)
Cambia el tema de la página basado en el estado del clima.
Actualiza el ícono del clima y los colores para reflejar el clima actual.
showError(message)
Muestra un mensaje de error si la ciudad no se encuentra o si hay problemas con la API.
fetchWeatherData(city)
Realiza la consulta a la API de OpenWeatherMap para obtener los datos del clima y los muestra en la interfaz.
