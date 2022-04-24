// APIキー
const API_KEY = "5ad1350dbe77f2d0fd0cb99858d989e5";
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

    // 取得したい情報と値を配列に格納
    const weather_Info ={
        weatherCity : city,
        weatherMain : weather.weather[0].main,
        weatherDescription : weather.weather[0].description,
        weatherTemp : weather.main.temp,
        weatherTemp_max : weather.main.temp_max,
        weatherTemp_min : weather.main.temp_min,
        weatherFeels_like : weather.main.feels_like
    };

    // 配列から値を取り出し画面に出力
    for (let key in weather_Info) {
        let weatheDate = document.getElementById(key);
        weatheDate.innerText = weather_Info[key];
    }
};