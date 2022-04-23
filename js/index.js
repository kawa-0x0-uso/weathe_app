const API_KEY = "5ad1350dbe77f2d0fd0cb99858d989e5";
const weatherArea = document.getElementById("weather");
let city ="";

let set_city = function (city) {
    city = this.value;
    console.log("値："+this.value);
    console.log("cityの値："+city);
    callApi(city);
};

document.querySelectorAll('.city').forEach(function (city) {
    city.addEventListener('click', set_city);
});

async function callApi(city){
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&lang=ja&APPID=5ad1350dbe77f2d0fd0cb99858d989e5");
    const weather = await res.json();

    // 都市名
    const weatherCity = document.createElement("li");
    weatherCity.innerText = weather.name;
    weatherArea.appendChild(weatherCity);
    // 天気
    const weatherData = document.createElement("li");
    weatherData.innerText = weather.weather[0].main;
    weatherArea.appendChild(weatherData);
    // 天気詳細
    const weatherDescription = document.createElement("li");
    weatherDescription.innerText = weather.weather[0].description;
    weatherArea.appendChild(weatherDescription);
    // 気温
    const weatherTemp = document.createElement("li");
    weatherTemp.innerText = weather.main.temp;
    weatherArea.appendChild(weatherTemp); 
    // 最高気温
    const weatherTemp_max = document.createElement("li");
    weatherTemp_max.innerText = weather.main.temp_max;
    weatherArea.appendChild(weatherTemp_max);
    // 最低気温
    const weatherTemp_min = document.createElement("li");
    weatherTemp_min.innerText = weather.main.temp_min;
    weatherArea.appendChild(weatherTemp_min); 
    // 体感温度
    const weatherFeels_like = document.createElement("li");
    weatherFeels_like.innerText = weather.main.feels_like;
    weatherArea.appendChild(weatherFeels_like); 
};
