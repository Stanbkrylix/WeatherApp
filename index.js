"use strict";

const celsiusTemp = document.querySelector(".celsius-temp");
const fareTemp = document.querySelector(".fare-temp");
const searchBtn = document.querySelector(".search-btn");
let currentCity = "berlin";

let celOrFar = true;

getWeather(currentCity);

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const inputSearch = document.querySelector(".search-input");

    if (
        inputSearch.value === null ||
        inputSearch.value === "undefined" ||
        inputSearch.value === "".trim()
    ) {
        return;
    } else {
        currentCity = inputSearch.value;
        getWeather(currentCity);
        inputSearch.value = "";
    }
});

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
            getWeather(currentCity);
        }
    });

    fareTemp.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains("temp-selected")) {
            target.classList.add("temp-selected");
            celsiusTemp.classList.remove("temp-selected");
            celOrFar = false;
            getWeather(currentCity);
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

    weatherImg.src = `https:${imgSrc}`;
}
async function getWeather(wantedCity) {
    try {
        const weather = await fetch(
            ` http://api.weatherapi.com/v1/forecast.json?key=0c02a0dc0c144d058d864439242303&q=${wantedCity}&days=7`
        );
        const weatherData = await weather.json();

        // error handling
        if (!weather.ok) {
            throw new Error(weatherData.error.message);
        }

        // retrieving data
        const weatherImg = weatherData.current.condition.icon;
        const city = weatherData.location.name;
        const country = weatherData.location.country;
        const tempValue = celOrFar
            ? weatherData.current.temp_c + " Cel"
            : weatherData.current.temp_f + " Far";
        const humidityValue = weatherData.current.humidity;
        const windSpeedValue = celOrFar
            ? weatherData.current.wind_kph + " Kph"
            : weatherData.current.wind_mph + " Mph";

        renderCityTemp(
            city,
            country,
            tempValue,
            humidityValue,
            windSpeedValue,
            weatherImg
        );

        const hours = weatherData.forecast.forecastday[0];
        renderCards(hours);

        const daysForecast = weatherData.forecast.forecastday;
        renderForecastDays(daysForecast);
    } catch (error) {
        renderError(error.message);
    }
}

function renderCards(cardsData) {
    const cardsDiv = document.querySelector(".hourly-temp-cards");
    cardsDiv.innerHTML = "";

    cardsData.hour.forEach((value) => {
        cardsDiv.innerHTML += hourCard(value);
    });
}

function renderForecastDays(forecastday) {
    const forecastCardDiv = document.querySelector(".forecast-cards");
    forecastCardDiv.innerHTML = "";

    forecastday.forEach((value) => {
        forecastCardDiv.innerHTML += forecastCard(value);
    });
}

function renderError(message) {
    const city1 = document.querySelector(".city");
    const country1 = document.querySelector(".country");
    const tempValue1 = document.querySelector(".temp-value");
    const humidityValue1 = document.querySelector(".humidity-value");
    const windSpeedValue1 = document.querySelector(".wind-speed-value");

    const weatherImg = document.querySelector(".weather-img");

    city1.textContent = message;
    country1.textContent = message;
    tempValue1.textContent = message;
    humidityValue1.textContent = message;
    windSpeedValue1.textContent = message;
    //
}

function hourCard(value) {
    return `
    <div class="hourly-card">
        <p class="time">${getDayTimes(value.time)}</p>
        <span class="material-symbols-outlined"
            >
            <img src ="https:${
                value.condition.icon
            }" alt="weather symbol"></span
        >
        <p class="hourly-temp">${
            celOrFar ? value.temp_c + " cel" : value.temp_f + " far"
        }</p>
    </div>
    
    `;
}

function forecastCard(value) {
    const card = `
    <div class="forecast-card">
        <span class="material-symbols-outlined">
        <img src ="https:${value.day.condition.icon}" alt="weather symbol">
        </span>
        <h2 class="forecast-temp">${
            celOrFar
                ? value.day.avgtemp_c + " cel"
                : value.day.avgtemp_f + " far"
        }</h2>
        <p class="forecast-date">
            ${changeDateFormat(value.date)}
        </p>
    </div>

    `;

    return card;
}

// helper function for formatting dates
function changeDateFormat(date) {
    // remove the 0s at the beginning of each number in date argument
    let originalDate = date;
    let parts = originalDate.split("-");
    let newDate =
        parts[0] + "-" + parseInt(parts[1], 10) + "-" + parseInt(parts[2], 10);

    // use new date value to regenerate string;
    const currentDate = new Date(newDate);
    const dateVal = `${getCurrentDay(
        currentDate.getDay()
    )}, ${currentDate.getDate()} ${getCurrentMonth(
        currentDate.getMonth()
    )}, ${currentDate.getFullYear()}
    `;

    return dateVal;
}

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

function greaterThan12(number) {
    if (number === 13) {
        return 1;
    }
    if (number === 14) {
        return 2;
    }
    if (number === 15) {
        return 3;
    }
    if (number === 16) {
        return 4;
    }
    if (number === 17) {
        return 5;
    }
    if (number === 18) {
        return 6;
    }
    if (number === 19) {
        return 7;
    }
    if (number === 20) {
        return 8;
    }
    if (number === 21) {
        return 9;
    }
    if (number === 22) {
        return 10;
    }
    if (number === 23) {
        return 11;
    }

    return "";
}

function getDayTimes(string) {
    let currentDate = new Date(string);

    const time = currentDate.getHours();
    const amOrPm = time < 12 ? "am" : "pm";

    switch (time) {
        case 0:
            return `${time} ${amOrPm}`;
        case 1:
            return `${time} ${amOrPm}`;

        case 2:
            return `${time} ${amOrPm}`;

        case 3:
            return `${time} ${amOrPm}`;

        case 4:
            return `${time} ${amOrPm}`;

        case 5:
            return `${time} ${amOrPm}`;

        case 6:
            return `${time} ${amOrPm}`;

        case 7:
            return `${time} ${amOrPm}`;

        case 8:
            return `${time} ${amOrPm}`;

        case 9:
            return `${time} ${amOrPm}`;

        case 10:
            return `${time} ${amOrPm}`;

        case 11:
            return `${time} ${amOrPm}`;

        case 12:
            return `${time} ${amOrPm}`;

        case 13:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 14:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 15:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 16:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 17:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 18:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 19:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 20:
            return `${greaterThan12(time)} ${amOrPm}`;

        case 21:
            return `${greaterThan12(time)} ${amOrPm}`;
        case 22:
            return `${greaterThan12(time)} ${amOrPm}`;
        case 23:
            return `${greaterThan12(time)} ${amOrPm}`;

        default:
            return "invalid Times";
    }
}
