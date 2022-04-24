// APIキー
const API_KEY = "5ad1350dbe77f2d0fd0cb99858d989e5";
// 表示領域のidを取得
// const weather_Area = document.getElementById("weather");
// 都市名を格納する変数
let city ="";

// 押下された都市を取得する
let set_city = function (city) {
    city = this.value;
    callApi(city);
};

// 都市取得イベント発火
document.querySelectorAll(".city").forEach(function (city) {
    city.addEventListener("click", set_city);
});

// APIで天気情報を取得する
async function callApi(city){
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=ja&APPID=" + API_KEY);
    const weather = await res.json();

    const weather_Info ={
        weatherCity : city,
        weatherMain : weather.weather[0].main,
        weatherDescription : weather.weather[0].description,
        weatherTemp : weather.main.temp,
        weatherTemp_max : weather.main.temp_max,
        weatherTemp_min : weather.main.temp_min,
        weatherFeels_like : weather.main.feels_like
    };

    for (let key in weather_Info) {
        console.log('key:' + key + ' value:' + weather_Info[key]);
        let weatheDate = document.getElementById(key);
        weatheDate.innerText = weather_Info[key];
    }

    console.log("配列てすと："+weather_Info.weatherMain);

    // // 都市名
    // const weatherCity = document.createElement("li");
    // weatherCity.innerText = weather.name;
    // weather_Area.appendChild(weatherCity);
    // // 天気
    // const weatherMain = document.createElement("li");
    // weatherMain.innerText = weather.weather[0].main;
    // weather_Area.appendChild(weatherMain);
    // // 天気詳細
    // const weatherDescription = document.createElement("li");
    // weatherDescription.innerText = weather.weather[0].description;
    // weather_Area.appendChild(weatherDescription);
    // // 気温
    // const weatherTemp = document.createElement("li");
    // weatherTemp.innerText = weather.main.temp;
    // weather_Area.appendChild(weatherTemp); 
    // // 最高気温
    // const weatherTemp_max = document.createElement("li");
    // weatherTemp_max.innerText = weather.main.temp_max;
    // weather_Area.appendChild(weatherTemp_max);
    // // 最低気温
    // const weatherTemp_min = document.createElement("li");
    // weatherTemp_min.innerText = weather.main.temp_min;
    // weather_Area.appendChild(weatherTemp_min); 
    // // 体感温度
    // const weatherFeels_like = document.createElement("li");
    // weatherFeels_like.innerText = weather.main.feels_like;
    // weather_Area.appendChild(weatherFeels_like); 
};