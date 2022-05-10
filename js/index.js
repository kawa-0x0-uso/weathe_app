// APIキー
const API_KEY = "5ad1350dbe77f2d0fd0cb99858d989e5";
// 都市名を格納する変数
let city ="";

function getDate(){
    // 月表示フォーマット
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // 曜日表示フォーマット
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    //　日付取得用
    const today = new Date();
    // 曜日の取得と出力
    let dateSet = document.getElementById("weekday");
    dateSet.innerText = weekdays[today.getDay()];
    // 日付の取得と出力
    dateSet = document.getElementById("day");
    dateSet.innerText = ("0"+today.getDate()).slice(-2);
    // 月の取得と出力
    dateSet = document.getElementById("month");
    dateSet.innerText = months[today.getMonth()];
};

getDate();

// 押下された都市を取得する
let set_city = function (city) {
    city = this.value;
    callApi(city);
};

// 都市取得イベント発火
document.querySelectorAll(".btn_city").forEach(function (city) {
    city.addEventListener("click", set_city);
});

// APIで天気情報を取得する
async function callApi(city){
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=ja&APPID=" + API_KEY);
    const weather = await res.json();
    console.log(weather);
    const icons = {
        Ikebukuro : ["fa-headphones","fa-futbol","fa-chess"],
        Yokohama : ["fa-skull","fa-handcuffs","fa-dharmachakra"],
        Shibuya : ["fa-candy-cane","fa-dice","fa-pen-nib"],
        Shinjuku : ["fa-crutch","fa-champagne-glasses","fa-capsules"],
        Nagoya : ["fa-vihara","fa-moon","fa-scale-balanced"],
        Osaka : ["fa-cat","fa-chalkboard-user","fa-masks-theater"]
    };

    const parent = document.getElementById("temp_minmax");
    
    // 日付の表示をテーマカラーに変更する
    let dateArea = document.getElementById("dateArea");
    dateArea.removeAttribute("class");
    dateArea.classList.add("class","date_area",city);

    // 取得したい情報と値を配列に格納
    const weather_Info ={
        weatherCity : city,
        weatherMain : weather.weather[0].main,
        weatherIcon : "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png",
        weatherDescription : weather.weather[0].description,
        weatherTemp : weather.main.temp,
        weatherTemp_max : weather.main.temp_max,
        weatherTemp_min : weather.main.temp_min,
        weatherFeels_like : weather.main.feels_like
    };

    // 配列から値を取り出し画面に出力
    for (let key in weather_Info) {
        let weatherDate = document.getElementById(key);

        switch(key){
            case "weatherCity" :
                // 地名のフォントカラーをテーマカラーに変更
                weatherDate.innerText = weather_Info[key];
                weatherDate.removeAttribute("class");
                weatherDate.setAttribute("class",city);

                // １番目のアイコン表示、テーマカラーに変更
                let icon = document.getElementById("icon_first");
                icon.removeAttribute("class");
                icon.classList.add("class","fa-solid",icons[city][0],city);

                // ２番目のアイコン表示、テーマカラーに変更
                icon = document.getElementById("icon_second");
                icon.removeAttribute("class");
                icon.classList.add("class","fa-solid",icons[city][1],city);

                // ３番目のアイコン表示、テーマカラーに変更
                icon = document.getElementById("icon_third");
                icon.removeAttribute("class");
                icon.classList.add("class","fa-solid",icons[city][2],city);

                break;

            case "weatherIcon" :
                weatherDate.src=weather_Info[key];
                break;
            case "weatherTemp" :
                weatherDate.innerText = Math.round(weather_Info[key]) + "°";
                break;
            case "weatherTemp_max" :
                
                let high = document.getElementById("high");
                high.setAttribute("class","high");
                weatherDate.innerText = Math.round(weather_Info[key])+ "°";
                break;
            case "weatherTemp_min" :
                let low = document.getElementById("low");
                low.setAttribute("class","low");
                weatherDate.innerText = + Math.round(weather_Info[key]) + "°";
                break;
            case "weatherFeels_like":
                weatherDate.innerText = "体感温度は" + Math.round(weather_Info[key]) + "° です。";
                break;
            default:
                weatherDate.innerText = weather_Info[key];
        }
    }
};