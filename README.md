# Aplicación Weather Aitor López

## Descripción

Esta aplicación web permite obtener y visualizar información meteorológica de diferentes ciudades, usando la [API de OpenWeather](https://openweathermap.org/api). Está diseñada como una Single Page Application (SPA), con una interfaz responsiva enfocada en el diseño **mobile-first**, implementada usando **Bootstrap v5** y **Sass**. Los usuarios pueden consultar el clima actual y el pronóstico de los próximos 4 días (utilizando el 5 Day / 3 Hour Forecast), ya sea introduciendo el nombre de una ciudad o utilizando la ubicación actual del dispositivo.

---

## Características

- **Clima Actual y Pronóstico**: Visualiza la información del clima en tiempo real y el pronóstico para los próximos 4 días.
- **Consulta por Ciudad o Ubicación Actual**: Permite buscar el clima de cualquier ciudad o usar la geolocalización del dispositivo para obtener los datos meteorológicos actuales y futuros.
- **Diseño Responsivo y Mobile-First**: La interfaz está diseñada para ser fácilmente navegable en dispositivos móviles, escalando apropiadamente en pantallas más grandes.
- **Interfaz Multilingüe**: Soporte para múltiples idiomas, ofreciendo una experiencia personalizada para diferentes usuarios.
- **Interactividad con jQuery**: Los componentes de la aplicación se muestran y ocultan de acuerdo con las selecciones del usuario en el menú, brindando una experiencia de navegación fluida.

---

## Requisitos Previos

### Dependencias

- **Bootstrap v5**: Framework CSS para el diseño y estructura responsiva.
- **Sass**: Preprocesador CSS para gestionar estilos y variables de forma modular.
- **jQuery**: Biblioteca para manipulación de DOM y gestión de eventos.
- **API de OpenWeather**: Obtener la clave de API en [OpenWeather](https://openweathermap.org/) para acceder a los datos meteorológicos.

### Archivos Sass

Estructura de archivos Sass:
  - `index.scss`: Archivo principal donde se compilan todos los estilos.
  - `_variables.scss`: Archivo de variables Sass para temas, colores, tamaños y configuraciones reutilizables.
  - `_elements.scss`: Definición de estilos específicos de componentes y elementos.
  - `_mixins.scss`: Mixins reutilizables para evitar redundancia y facilitar la extensión de estilos.