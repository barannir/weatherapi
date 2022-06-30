"use strict"


window.onload = function() {
    const weather = document.querySelector('.weather');

    if (weather) {
        const content = document.querySelector('.weather');
        const speed = 0.05;
        let positionX = 0,
            positionY = 0;
        let coordXprocent = 0,
            coordYrocent = 0;

        function setMouseWeatherStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYrocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            weather.style.cssText = `transform: translate(${positionX / forWeather}%,${positionY / forWeather}%);`;

            requestAnimationFrame(setMouseWeatherStyle);

        }
        setMouseWeatherStyle();
        weather.addEventListener("mousemove", function(e) {
            //Получение ширины и высоты блока
            const weatherWidth = weather.offsetWidth;
            const weatherHeight = weather.offsetHeight;

            //от текущего положения мыши делим на /2
            const coordX = e.pageX - weatherWidth / 2;
            const coordY = e.pageY - weatherHeight / 2;

            // Заполняем процентмыми значениями обьявленные переменные
            coordXprocent = coordX / weatherWidth * 100;
            coordYrocent = coordY / weatherHeight * 100;
        });
    }
}