"use strict"
"SameSite = Strict"



// Блок с погодой
const weatherBlock = document.querySelector('#weather');
// Асинхронная функция(для работы с fetch). Основная функция загрузки данных с сервера.
// Добавляем гифку для того, чтобы при загрузки инфы с сайта посетителю отображалась гивка.
// Const server - тип данных откуда будет браться инфо о погоде, ждать отклика.
// Fetch - это улучшеный XMLHttpRequest, для работы с API (на данный момент, с погодой.)
// method: 'GET' - запрос на получение информации о погоде с сервера. И получаем ответ в формате .json
// Если ответ ОК, мы будет запускать функцию getweather и передавать туда данные. Если есть ошибка, текст ошибки будет отображаться в виджите.
//https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=522f7ec766b55c89fccbc47a4e7a72c0
//https://api.openweathermap.org/data/3.0/onecall?lat=50.450001&lon=30.523333&appid=346f2ff7088e977052ac098680807713
async function loadWeather(e) {
    weatherBlock.innerHTML = `
	
	<div class="weather__loading">
	<img src="img/loading.gif" alt="Loading.."
	</div>`;

    const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=522f7ec766b55c89fccbc47a4e7a72c0';
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }

}

function getWeather(data) {
    // Обробатываем и выводим данные
    console.log('data');
    // Берем данны о городе (Киев)
    // Берем данны о температуре (math round - для округления
    // Берем данны о как чувстувается
    // Статус погоды (ясно, тучи и т.д.)
    // Показывает иконку погоды

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    // Вывод данных в HTML

    const template = `
	<div class="weather__header">
		<div class="weather__main">
			<div class="weather__city">${location}</div>
			<div class="weather__status">${weatherStatus}</div>
	</div>
	<div class="weather__icon">
		<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="&{weatherIcon}">
	</div>
</div>
<div class="weather__temp">${temp}</div>
<div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

    weatherBlock.innerHTML = template;

}


// 18-Проверка. Если есть блок с погодой, запускаем функицю.
if (weatherBlock) {
    loadWeather();
}