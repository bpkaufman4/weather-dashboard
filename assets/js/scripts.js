
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-search');
var cityEl = document.querySelector('#city');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var uvEl = document.querySelector('#uv');

var date1El = document.querySelector('#date1');
var date2El = document.querySelector('#date2');
var date3El = document.querySelector('#date3');
var date4El = document.querySelector('#date4');
var date5El = document.querySelector('#date5');


date1El.innerHTML = moment().add(1, 'days').format("L")
date2El.innerHTML = moment().add(2, 'days').format("L")
date3El.innerHTML = moment().add(3, 'days').format("L")
date4El.innerHTML = moment().add(4, 'days').format("L")
date5El.innerHTML = moment().add(5, 'days').format("L")
cityEl.innerHTML = "(" + moment().format("L") + ")";

var getForecastData = function (daysAhead, data) {
    const temp = document.querySelector('#temp' + daysAhead);
    const wind = document.querySelector('#wind' + daysAhead);
    const hum = document.querySelector('#hum' + daysAhead);

    temp.innerHTML = 'Temp: ' + data.daily[daysAhead-1].temp.day;
    wind.innerHTML = 'Wind: ' + data.daily[daysAhead-1].wind_speed + ' MPH';
    hum.innerHTML = 'Humidity: ' + data.daily[daysAhead-1].humidity + '%';
};


var displayWeather = function(currentObj) {
    console.log(currentObj);
    tempEl.innerHTML = "Temp: " + currentObj.current.temp + "°F";
    windEl.innerHTML = "Wind: " + currentObj.current.wind_speed + " MPH"
    humidityEl.innerHTML = "Humidity: " + currentObj.current.humidity + " %"
    uvEl.innerHTML = "UV Index: " + currentObj.current.uvi

    getForecastData(1, currentObj);
    getForecastData(2, currentObj);
    getForecastData(3, currentObj);
    getForecastData(4, currentObj);
    getForecastData(5, currentObj);
};


var getCityCoordinates = function(city) {
    console.log(city.coord.lat, city.coord.lon);
    var apiCityCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon=" + city.coord.lon + "&units=imperial&appid=64197eb05654a42e732c6020c1d3ec31"

    fetch(apiCityCoordinates)
    .then(function(response) {
        response.json()
        .then(function(data) {
            displayWeather(data);
        })
    })
}

var getCurrentWeatherData = function(city) {
    // format the api url from openWeather
    stateName = city.trim().split(" ").join("+");

var apiCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=64197eb05654a42e732c6020c1d3ec31";
    
    fetch(apiCurrentUrl)
    .then(function(response) {
        response.json()
        .then(function(data) {
            getCityCoordinates(data);
        });
    })

};



var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value;
    const words = city.split(" ")

    if (city) {
        getCurrentWeatherData(city);
        cityInputEl.value = "";

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }


        cityEl.innerHTML = words.join(" ") + " " + "(" + moment().format("L") + ")";
    } else {
        alert("Please enter a city name")
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);