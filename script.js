let urlBase= 'https://api.openweathermap.org/data/2.5/weather'
let apiKey='b660da4e87d6f137b823f009ca5e0efc'
let tempKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchClimaCiudad(ciudad)
        setInterval(() => {
            ciudad=''
            
        }, 1000);
    }
})

function fetchClimaCiudad(ciudad){
        fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
        .then(dataResp => dataResp.json())
        .then(dataResp => mostrarClima(dataResp))
    }

function mostrarClima(dataResp){
    console.log(dataResp)//este nos sirve de machete para ver qué mas se puede agregar abajo de la info API
    const divMostrar = document.getElementById('datosClima')
    divMostrar.innerHTML=''

    const nombreCiudad = dataResp.name
    const nombrePais = dataResp.sys.country
    const tituloCiudad= document.createElement('h2')
    tituloCiudad.innerHTML = (nombreCiudad +',' +' '+nombrePais)

    const temperatura = dataResp.main.temp
    const infoTemp= document.createElement('p')
    infoTemp.innerHTML = `La Temperatura es ${Math.floor(temperatura- tempKelvin)} °C`

    const hum = dataResp.main.humidity
    const infoHum= document.createElement('p')
    infoHum.innerHTML = `El porcentaje de humedad relativa es ${hum}%`

    const nubes = dataResp.weather[0].description
    const infoNubes= document.createElement('p')
    infoNubes.innerHTML = `El cielo está hoy ${nubes}`

    const icono = dataResp.weather[0].icon
    const infoIcono = document.createElement('img')
    infoIcono.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    divMostrar.appendChild(tituloCiudad)
    divMostrar.appendChild(infoTemp)
    divMostrar.appendChild(infoHum)
    divMostrar.appendChild(infoNubes)
    divMostrar.appendChild(infoIcono)
}


