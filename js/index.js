// APIキー
const API_KEY = "5ad1350dbe77f2d0fd0cb99858d989e5";
// 都市名を格納する変数
let city ="";

// 現在日時の取得と出力
function getDate(){
    // 月表示フォーマット
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // 曜日表示フォーマット
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    //　日付取得用
    let today = new Date();
    let date_now = [weekdays[today.getDay()],("0"+today.getDate()).slice(-2),months[today.getMonth()]];

    // 取得した日付をhtmlに出力関数を呼び出す
    renderDate(date_now);
};

// getDateで取得した日付を出力する
function renderDate(date_now){
    // 曜日の取得と出力
    let dateSet = document.getElementById("weekday");
    dateSet.innerText = date_now[0];
    // 日付の取得と出力
    dateSet = document.getElementById("day");
    dateSet.innerText = date_now[1];
    // 月の取得と出力
    dateSet = document.getElementById("month");
    dateSet.innerText = date_now[2];
};

// APIで天気情報を取得する
async function callApi(city){
    // APIへリクエストをし、json形式で情報を取得する
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=ja&APPID=" + API_KEY);
    const weather = await res.json();

    // 取得したい情報と値を配列に格納
    const weather_Info ={
        weatherCity : city,
        weatherMain : weather.weather[0].main,
        weatherIcon : weather.weather[0].icon,
        weatherDescription : weather.weather[0].description,
        weatherTemp : weather.main.temp,
        weatherTemp_max : weather.main.temp_max,
        weatherTemp_min : weather.main.temp_min,
        weatherFeels_like : weather.main.feels_like
    };

    renderHtml(weather_Info,city);
};

function renderHtml(weather_Info,city){
    // 日付の表示をテーマカラーに変更する
    let dateArea = document.getElementById("dateArea");
    dateArea.removeAttribute("class");
    dateArea.classList.add("class","date_area",city);

    // 装飾用のアイコンを格納
    const icons = {
        Ikebukuro : ["fa-headphones","fa-futbol","fa-chess"],
        Yokohama : ["fa-skull","fa-handcuffs","fa-dharmachakra"],
        Shibuya : ["fa-candy-cane","fa-dice","fa-pen-nib"],
        Shinjuku : ["fa-crutch","fa-champagne-glasses","fa-capsules"],
        Nagoya : ["fa-vihara","fa-moon","fa-scale-balanced"],
        Osaka : ["fa-cat","fa-chalkboard-user","fa-masks-theater"]
    };

    // 最低・最高気温を出力するため親要素を取得
    const parent = document.getElementById("temp_minmax");
    
    // 配列から値を取り出し画面に出力
    let weatherDate = document.getElementById("weatherCity");

    // 地名のフォントカラーをテーマカラーに変更
    weatherDate.innerText = weather_Info.weatherCity;
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

    // 天気に応じたアイコン
    weatherDate = document.getElementById("weatherIcon");
    weatherDate.src="https://openweathermap.org/img/wn/" + weather_Info.weatherIcon + "@2x.png";

    // 気温
    weatherDate = document.getElementById("weatherTemp");
    weatherDate.innerText = Math.round(weather_Info.weatherTemp) + "°";

    // 最高気温
    weatherDate = document.getElementById("weatherTemp_max");
    let high = document.getElementById("high");
    high.setAttribute("class","high");
    weatherDate.innerText = Math.round(weather_Info.weatherTemp_max)+ "°";

    // 最低気温
    weatherDate = document.getElementById("weatherTemp_min");
    let low = document.getElementById("low");
    low.setAttribute("class","low");
    weatherDate.innerText = + Math.round(weather_Info.weatherTemp_min) + "°";

    // 体感温度
    weatherDate = document.getElementById("weatherFeels_like");
    weatherDate.innerText = "体感温度は" + Math.round(weather_Info.weatherFeels_like) + "° です。";
};

// ページの読み込みと同時に日付を取得する
getDate();

// 押下された都市を取得し、callApiの関数を実行する
let set_city = function (city) {
    city = this.value;
    callApi(city);
};

// 都市ボタンのクリックイベントを定義
document.querySelectorAll(".btn_city").forEach(function (city) {
    city.addEventListener("click", set_city);
});