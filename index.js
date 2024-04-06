"use strict";

const celsiusTemp = document.querySelector(".celsius-temp");
const fareTemp = document.querySelector(".fare-temp");

function changeWeather() {
    celsiusTemp.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains("temp-selected")) {
            target.classList.add("temp-selected");
            fareTemp.classList.remove("temp-selected");
        }
    });

    fareTemp.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (!target.classList.contains("temp-selected")) {
            target.classList.add("temp-selected");
            celsiusTemp.classList.remove("temp-selected");
        }
    });
}
changeWeather();
