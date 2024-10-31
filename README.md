# PaginaClima
Este proyecto es una pagina web de consulta climática que permite a los usuarios ingresar el nombre de una ciudad para obtener información meteorológica en tiempo real, incluyendo la temperatura, y mas. Además, muestra la ubicación en un mapa interactivo. La aplicación consume la API de OpenWeatherMap para obtener los datos del clima y utiliza una biblioteca de mapas, como Leaflet para representar la ubicación geográfica en la interfaz.

**Características principales:**

1. **Consulta de Datos Climáticos:**
    
    - Los usuarios ingresan una ciudad y, al enviarla, la aplicación realiza una solicitud a la API de OpenWeatherMap.
    - La información obtenida incluye una descripción general del clima, temperatura, humedad, presión atmosférica, y velocidad del viento.
2. **Mapa Interactivo:**
    
    - La aplicación muestra la ubicación de la ciudad buscada en un mapa interactivo.
    - Utiliza una biblioteca de mapas (Leaflet) para mostrar la latitud y longitud en un marcador centralizado.
    - Permite explorar la ciudad visualmente y muestra un marcador con el nombre de la ciudad en la vista del mapa.
3. **Interfaz Intuitiva y Estética:**
    
    - La aplicación cuenta con una interfaz sencilla y accesible.
    - Incorpora un formulario para la búsqueda, una sección de resultados del clima en formato de tabla, y el mapa en una vista compacta y visualmente organizada.

**Tecnologías Utilizadas:**

- **HTML y CSS:** Para estructurar y estilizar la interfaz de usuario.
- **JavaScript:** Para manejar la lógica del formulario, la integración con la API del clima y la manipulación del mapa.
- **API de OpenWeatherMap:** Para la obtención de datos meteorológicos en tiempo real.
- **Biblioteca de Mapas (Leaflet):** Para mostrar mapas interactivos y marcadores en el navegador.

**Aplicación y Usabilidad:** Esta aplicación es útil para cualquier persona interesada en conocer el clima actual de diferentes ciudades de forma rápida y visual. Puede implementarse como una herramienta de consulta diaria para viajeros, estudiantes, o personas que necesitan verificar el clima de manera ágil y amigable.
