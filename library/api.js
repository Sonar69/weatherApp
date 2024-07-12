import {weatherCode} from "./weatherCode.js";
import {Position} from "../Class/Position.js";

//
// element HTML
const contentAPI = document.getElementById('containerAPI')
const contentAPIAllDay = document.getElementById('containerAPI-all-day')
const contentDatTime = document.getElementById('date-time-container')
const searchCountry = document.getElementById('search-country')
const selectCountry = document.getElementById('search-country-select')
const buttonValide = document.getElementById('button-valid')
const buttonGeolocation = document.getElementById('geolocation')
let coordonne
let dateTime = new Date

//
// function upTime
function upTime() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    dateTime = new Date
    contentDatTime.innerHTML = `<h4 class="card-title date-time">${dateTime.toLocaleTimeString(undefined, options)}</h4>`;
}

// initialize time
upTime()
// update time every second
setInterval(upTime, 1000) // 1 second

//
// fonction position user on load
async function positionUser(pos) {
    const crd = pos.coords
    // console.log('User\'s position: ', crd.latitude, ', ', crd.longitude)
    let result
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    let dataUser = await fetchDataGeoLoc('https://api.distancematrix.ai/maps/api/geocode/json?latlng='
        + latitude + ',' + longitude + '&language=fr&key=TJYai5Obo0VArEOmc4wbBtlILpiSwBZTBGs11qf8L2mIqO5f0AwfrwSMnsYLolF1')
    result = await fetchData('https://api.open-meteo.com/v1/forecast?latitude='
        + latitude + '&longitude='
        + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin'
    )
    // console.log('DATA USER +++ ' + dataUser)
}

//
// on load windows
function onLoadWindows() {
    window.onload = function () {
// récupération position utilisateur
        navigator.geolocation.getCurrentPosition(positionUser, error)
        setTimeout(clickButtonSearch, 600)
    }
}

// affiche position user
onLoadWindows()

//
// fonction click button auto
function clickButtonSearch() {
    buttonValide.click()
    // console.log('Button clicked')
}

//
// function error position
function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}

//
// event selection city
buttonValide.addEventListener('click', (e) => {
    coordonne = selectCountry.value.split('--')
    position(coordonne[0], coordonne[1], coordonne[2], coordonne[3], coordonne[4], coordonne[5])
})

//
// event api latitude/longitude
searchCountry.addEventListener('input', (e) => {
    console.log(e.target.value)
    countrySearch('https://geocoding-api.open-meteo.com/v1/search?name='
        + e.target.value + '&count=10&language=FR&format=json')
})

//
// event geoloc button
buttonGeolocation.addEventListener('click', (e) => {
    window.location.reload();
    onLoadWindows()
})

//
// function search country
async function countrySearch(url) {
    let option = ''
    let response = await fetch(url)
        .then((response) => response.json())
        .then((json) => json) // makeCard(json)
    response['results'].forEach(ville => {
        if (ville.country === 'France') {
            option +=
                `<option value="${ville.latitude}--${ville.longitude}--${ville.country}--${ville.name}--${ville.admin1}--${ville.admin3}">
                    ${ville.name} -- ${ville.country} -- ${ville.postcodes ? `${ville.postcodes[0]}` : ''}
                </option>`;
        }
        selectCountry.innerHTML = option
    })
}

//
// function recuperation API (weather) avec coordonné
async function position(x, y, country, city, region, arrond) {
    // console.log('Position:' + x + ' ' + y);
    const crd = new Position(x, y);
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    await fetchData('https://api.open-meteo.com/v1/forecast?latitude='
        + latitude + '&longitude='
        + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin'
        , country, city, region, arrond)

}

//
// function traitement API
async function fetchData(url, country, city, region, arrond) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => makeCard(json, country, city, region, arrond))// make card
}

//
// function traitement API geoloc
async function fetchDataGeoLoc(url) {
    // debugger
    let out;
    out = await fetch(url)
        .then((response) => response.json())
        .then((json) => json)//
    await countrySearch('https://geocoding-api.open-meteo.com/v1/search?name='
        + out['result'][0]['address_components'][1]['long_name'] + '&count=10&language=FR&format=json')
    // console.log('DATA GEO LOC => ' + out['result'][0]['address_components'][1]['long_name'])
}

//
// function creation card
async function makeCard(data, country, city, region, arrond) {
    // console.log(data)
    contentAPI.innerHTML =
        `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${country}</h5>
                <h4 class="card-title">${region}</h4>
                <h4 class="card-title">${arrond}</h4>
                <h5 class="card-title">${city}</h5>
                <p class="card-text">Actuellement : ${await weatherCode(data['current']['weather_code'], true)}</p>
                <p class="card-text">Temperature : ${await data['current']['temperature_2m']} °C</p>
                <p class="card-text">Humidité : ${await data['current']['relative_humidity_2m']} %</p>
            </div>
        </div>`
    // console.log("VALUE => " + contentAPI.hasChildNodes());
    // data['daily'].forEach(function (value) {
    //     contentAPIAllDay.innerHTML +=
    //         `<div class="card-body">
    //             <span class="card-weather">${value['time']} -- ${await weatherCode(value['weather_code'])}</span>
    //             <span class="card-weather">Max : ${value['temperature_2m_max']} °C</span>
    //             <span class="card-weather">Min : ${value['temperature_2m_min']} °C</span>
    //         </div>
    //         `
    // })
    const daysCount = 7;
    let htmlContent = `<h4>Prévision sur 7 jours</h4>`;
    for (let i = 0; i < daysCount; i++) {
        const date = data['daily']['time'][i];
        const weather = await weatherCode(data['daily']['weather_code'][i], false);
        const tempMin = data['daily']['temperature_2m_min'][i];
        const tempMax = data['daily']['temperature_2m_max'][i]; // assuming you want to show max temp too

        htmlContent += `
            <span class="card-weather">${date} -- ${weather}</span>
            <span class="card-weather">Température Min / Maxi : ${tempMin} / ${tempMax}</span>    
        `;
    }
    contentAPIAllDay.innerHTML = htmlContent;
}






