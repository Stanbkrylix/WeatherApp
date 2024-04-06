"use strict";

const celsiusTemp = document.querySelector(".celsius-temp");
const fareTemp = document.querySelector(".fare-temp");
let celOrFar = true;

function displayDate() {
    const currentDateP = document.querySelector(".header .date");
    let currentDate = new Date();

    const dateVal = `${getCurrentDay(
        currentDate.getDay()
    )}, ${currentDate.getDate()} ${getCurrentMonth(
        currentDate.getMonth()
    )}, ${currentDate.getFullYear()}
    `;

    currentDateP.textContent = dateVal;
}
displayDate();

function changeWeather() {
    celsiusTemp.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains("temp-selected")) {
            target.classList.add("temp-selected");
            fareTemp.classList.remove("temp-selected");
            celOrFar = true;
            getWeather();
        }
    });

    fareTemp.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains("temp-selected")) {
            target.classList.add("temp-selected");
            celsiusTemp.classList.remove("temp-selected");
            celOrFar = false;
            getWeather();
        }
    });
}
changeWeather();
function renderCityTemp(
    city,
    country,
    tempValue,
    humidityValue,
    windSpeedValue,
    imgSrc
) {
    const city1 = document.querySelector(".city");
    const country1 = document.querySelector(".country");
    const tempValue1 = document.querySelector(".temp-value");
    const humidityValue1 = document.querySelector(".humidity-value");
    const windSpeedValue1 = document.querySelector(".wind-speed-value");

    const weatherImg = document.querySelector(".weather-img");

    city1.textContent = `${city}`;
    country1.textContent = `${country}`;
    tempValue1.textContent = `${tempValue}`;
    humidityValue1.textContent = `${humidityValue}%`;
    windSpeedValue1.textContent = `${windSpeedValue}`;

    // weatherImg.src = `https://cdn.weatherapi.com/weather/64x64/day/116.png`;
    weatherImg.src = `https:${imgSrc}`;
}
async function getWeather() {
    try {
        const weather = await fetch(
            " http://api.weatherapi.com/v1/forecast.json?key=0c02a0dc0c144d058d864439242303&q=tampa"
        );
        const weatherData = await weather.json();
        console.log(weatherData);
        const weatherImg = weatherData.current.condition.icon;
        const city = weatherData.location.name;
        const country = weatherData.location.country;
        const tempValue = celOrFar
            ? weatherData.current.temp_c + " Cel"
            : weatherData.current.temp_f + " Far";
        const humidityValue = weatherData.current.humidity;
        const windSpeedValue = celOrFar
            ? weatherData.current.gust_kph + " Kph"
            : weatherData.current.gust_mph + " Mph";

        renderCityTemp(
            city,
            country,
            tempValue,
            humidityValue,
            windSpeedValue,
            weatherImg
        );
        console.log(weatherImg);
    } catch (error) {
        console.log(error);
    }
}
getWeather();

function getCurrentDay(day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "invalid day";
    }
}
function getCurrentMonth(month) {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "invalid Month";
    }
}
