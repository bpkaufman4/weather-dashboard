var getWeatherData = function(city) {
    // format the api url from openWeather
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=64197eb05654a42e732c6020c1d3ec31";

    fetch(apiUrl)
    .then(function(response) {
        response.json()
        .then(function(data) {
            console.log(data);
        });
    })
};
getWeatherData("london");