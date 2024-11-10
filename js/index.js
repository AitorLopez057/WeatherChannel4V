$(document).ready(function () {
    // Api necesaria de OpenWeather para hacer todas las peticions get
    const api = '4846f75d49c143778ec54bfb82d269fa';
    $('#infoUbicacionBuscado').hide();

    coordenadas = []
    lugarActual = ""
    lenguaje = "es"

    // SECCIÓN UBICACIÓN ACTUAL
    // Preguntamos al usuario por su ubicación
    navigator.geolocation.getCurrentPosition(geolocalizacionPermitida);

    // Sin nos permite almacenar su ubicación, sacamos su longitud y latidud
    function geolocalizacionPermitida(position) {
        coordenadas = {
            Latitud: position.coords.latitude,
            Longitud: position.coords.longitude
        };


        $('#btnIngles').on('click', function (event) {
            event.preventDefault();
            dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            for (let i = 0; i < 5; i++) {
                let diaIndex = (diaActual + i) % 7;
                proximosDias = dias[diaIndex];
                $('#diaActual' + i).text(proximosDias);
            }

            $("#txtSensacionTermica").text('Thermal Sensation');
            $("#txtPredicion").text('Prediction for the next 4 days');
            $("#txtPresion").text('Pressure');
            $("#txtHumedad").text('Humidity');
            $("#txtViento").text('Wind');
            $("#txtVisibilidad").text('Visibility');
        });

        $('#btnEspanol').on('click', function (event) {
            dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            event.preventDefault();

            fecha = new Date();
            diaActual = fecha.getDay();

            for (let i = 0; i < 5; i++) {
                let diaIndex = (diaActual + i) % 7;
                proximosDias = dias[diaIndex];
                $('#diaActual' + i).text(proximosDias);
            }

            $("#txtSensacionTermica").text('Sensación Térmica');
            $("#txtPredicion").text('Prediccion para los próximos 4 días');
            $("#txtPresion").text('Presión');
            $("#txtHumedad").text('Humedad');
            $("#txtViento").text('Viento');
            $("#txtVisibilidad").text('Visibilidad');
        });

        // Para la predicción de los próximos 4 días, sabiendo el día actual, sacamos los 3 siguientes

        dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        fecha = new Date();
        diaActual = fecha.getDay();

        for (let i = 0; i < 5; i++) {
            let diaIndex = (diaActual + i) % 7;
            proximosDias = dias[diaIndex];
            $('#diaActual' + i).text(proximosDias);
        }

        $("#txtSensacionTermica").text('Sensación Térmica');
        $("#txtPredicion").text('Prediccion para los próximos 4 días');
        $("#txtPresion").text('Presión');
        $("#txtHumedad").text('Humedad');
        $("#txtViento").text('Viento');
        $("#txtVisibilidad").text('Visibilidad');



        // Petición 1: Con la Longitud y Latidud, saber el lugar donde se encuentra el usuario

        $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordenadas.Latitud}&lon=${coordenadas.Longitud}&limit=1&appid=${api}&lang=${lenguaje}`,
            type: 'GET',

            success: function (respuesta) {
                respuesta.forEach(function (lugar) {
                    lugarActual = lugar.name
                    $('#lugar').text(lugarActual)
                });
            }
        });


        // Petición 2, saber los datos del tiempo del lugar donde se encuentra el usuario

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.Latitud}&lon=${coordenadas.Longitud}&appid=${api}&units=metric&lang=${lenguaje}`,
            type: 'GET',
            success: function (respuesta) {
                $('#temperatura').text(Math.round(respuesta.main.temp) + "°")
                $('#temperaturaMax').text(Math.round(respuesta.main.temp_max) + "°")
                $('#temperaturaMin').text(Math.round(respuesta.main.temp_min) + "°")
                $('#tipo').text(respuesta.weather.main)
                $('#sensacionTermica').text(Math.round(respuesta.main.feels_like) + "°")

                $('#presionActual').text(Math.round(respuesta.main.pressure) + "mb")
                $('#humedadActual').text(Math.round(respuesta.main.humidity) + "%")
                $('#vientoActual').text(Math.round(respuesta.wind.speed) + "KM/H")
                $('#visibilidadActual').text(Math.round(respuesta.visibility) + "m")
            }
        });

        // Petición 3, saber la indormación adicional del tiempo de la ubicación donde se 
        // encuentra el usuario

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${coordenadas.Latitud}&lon=${coordenadas.Longitud}&appid=${api}&units=metric&lang=${lenguaje}`,
            type: 'GET',

            success: function (respuesta) {
                let listaRespuestas = respuesta.list;

                for (let i = 0; i < listaRespuestas.length; i++) {
                    $('#humedad' + i).text(Math.round(listaRespuestas[i].main.humidity) + "%");
                    $('#icono' + i).append(`
                        <img height="40px" width="40px" src="http://openweathermap.org/img/wn/${listaRespuestas[i].weather[0].icon}@2x.png"></img>
                    `);
                    $('#tempMax' + i).text(Math.round(listaRespuestas[i].main.temp_max) + "°");
                    $('#tempMin' + i).text(Math.round(listaRespuestas[i].main.temp_min) + "°");
                }

            }
        });

    }



    // SECCIÓN UBICACIÓN PASADA POR FORMULARIO

    // Cuando se pulsa el botón de buscar en el formulario, almacenamos el nombre de la ubicación
    // que nos han pasado
    $('#btnBuscar').on('click', function (event) {
        event.preventDefault();
        const placeName = $('#placeName').val();

        // Petición 1: Sacamos todas las ubicaciones que tengan por nombre el que nos han pasado
        // en el formulario

        $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=5&appid=${api}&lang=${lenguaje}`,
            type: 'GET',
            success: function (respuesta) {
                if (respuesta.length > 0) {
                    $('#resultadosCiudades').empty();
                    respuesta.forEach(function (lugar) {
                        const nombre = lugar.name;
                        const estado = lugar.state;
                        const pais = lugar.country;

                        const longitud = lugar.lon;
                        const latitud = lugar.lat;

                        $('#resultadosCiudades').append(`
                            <option value="${longitud} ${latitud}"> ${nombre} ${pais}, ${estado}</option>
                        `);

                    });
                }
            },
        });
    });


    // Sección buscar

    // Cuando el usuario selecciona una ciudad del ComboBox, volvemos a hacer las mimas peticiones 
    // que en la sección anterior pero con la ubicación introducida
    var nombreLugar = "";
    $('#resultadosCiudades').on('change', function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página

        $('#infoMiUbicacion').fadeOut('slow');
        $('#infoUbicacionBuscado').fadeIn('slow');

        var opcionValor = $(this).val();

        const [longitud, latitud] = opcionValor.split(" ");

        const coordenadasBuscadas = {
            Longitud: longitud,
            Latitud: latitud
        };

        dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        fecha = new Date();
        diaActual = fecha.getDay();

        for (let i = 0; i < 5; i++) {
            let diaIndex = (diaActual + i) % 7;
            proximosDias = dias[diaIndex];
            $('#diaActualBuscado' + i).text(proximosDias);
        }

        $("#txtSensacionTermicaBuscado").text('Sensación Térmica');
        $("#txtPredicionBuscado").text('Prediccion para los próximos 4 días');
        $("#txtPresionBuscado").text('Presión');
        $("#txtHumedadBuscado").text('Humedad');
        $("#txtVientoBuscado").text('Viento');
        $("#txtVisibilidadBuscado").text('Visibilidad');

        $('#btnIngles').on('click', function (event) {
            event.preventDefault();
            dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            for (let i = 0; i < 5; i++) {
                let diaIndex = (diaActual + i) % 7;
                proximosDias = dias[diaIndex];
                $('#diaActualBuscado' + i).text(proximosDias);
            }

            $("#txtSensacionTermicaBuscado").text('Thermal Sensation');
            $("#txtPredicionBuscado").text('Prediction for the next 4 days');
            $("#txtPresionBuscado").text('Pressure');
            $("#txtHumedadBuscado").text('Humidity');
            $("#txtVientoBuscado").text('Wind');
            $("#txtVisibilidadBuscado").text('Visibility');
        });

        $('#btnEspanol').on('click', function (event) {
            dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            event.preventDefault();

            fecha = new Date();
            diaActual = fecha.getDay();

            for (let i = 0; i < 5; i++) {
                let diaIndex = (diaActual + i) % 7;
                proximosDias = dias[diaIndex];
                $('#diaActualBuscado' + i).text(proximosDias);
            }

            $("#txtSensacionTermicaBuscado").text('Sensación Térmica');
            $("#txtPredicionBuscado").text('Prediccion para los próximos 4 días');
            $("#txtPresionBuscado").text('Presión');
            $("#txtHumedadBuscado").text('Humedad');
            $("#txtVientoBuscado").text('Viento');
            $("#txtVisibilidadBuscado").text('Visibilidad');
        });

        // Para la predicción de los próximos 4 días, sabiendo el día actual, sacamos los 3 siguientes



        $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${coordenadasBuscadas.Latitud}&lon=${coordenadasBuscadas.Longitud}&limit=1&appid=${api}&lang=${lenguaje}`,
            type: 'GET',

            success: function (respuesta) {
                respuesta.forEach(function (lugar) {
                    lugarActual = lugar.name
                    $('#lugarBuscado').text(lugarActual)
                });
            }
        });

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadasBuscadas.Latitud}&lon=${coordenadasBuscadas.Longitud}&appid=${api}&units=metric&lang=${lenguaje}`,
            type: 'GET',
            success: function (respuesta) {
                $('#temperaturaBuscado').text(Math.round(respuesta.main.temp) + "°")
                $('#temperaturaMaxBuscado').text(Math.round(respuesta.main.temp_max) + "°")
                $('#temperaturaMinBuscado').text(Math.round(respuesta.main.temp_min) + "°")
                $('#tipoBuscado').text(respuesta.weather.main)
                $('#sensacionTermicaBuscado').text(Math.round(respuesta.main.feels_like) + "°")

                $('#presionActualBuscado').text(Math.round(respuesta.main.pressure) + "mb")
                $('#humedadActualBuscado').text(Math.round(respuesta.main.humidity) + "%")
                $('#vientoActualBuscado').text(Math.round(respuesta.wind.speed) + "KM/H")
                $('#visibilidadActualBuscado').text(Math.round(respuesta.visibility) + "m")
            }
        });

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${coordenadasBuscadas.Latitud}&lon=${coordenadasBuscadas.Longitud}&appid=${api}&units=metric&lang=${lenguaje}`,
            type: 'GET',

            success: function (respuesta) {
                let listaRespuestas = respuesta.list;
                for (let i = 0; i < listaRespuestas.length; i++) {
                    $('#humedadBuscado' + i).text(Math.round(listaRespuestas[i].main.humidity) + "%");
                    $('#iconoBuscado' + i).attr('src', `http://openweathermap.org/img/wn/${listaRespuestas[i].weather[0].icon}@2x.png`);
                    $('#iconoBuscado' + i).attr('height', `40px`);
                    $('#iconoBuscado' + i).attr('width', `40px`);
                    $('#tempMaxBuscado' + i).text(Math.round(listaRespuestas[i].main.temp_max) + "°");
                    $('#tempMinBuscado' + i).text(Math.round(listaRespuestas[i].main.temp_min) + "°");
                }
            }
        });

    });

    $('#btnTiempoUbiActual').on('click', function () {
        $('#infoUbicacionBuscado').hide();
        $('#infoMiUbicacion').show();
    });

});