savedSearches = [];

var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city-search');
var cityEl = document.querySelector('#city');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var uvEl = document.querySelector('#uv');
var iconEl = document.querySelector('#icon');

var showBtnEl = document.querySelector('#show');
var hideBtnEl = document.querySelector('#hide');
var hourlyBoxEl = document.querySelector('#hourly-box');

var date1El = document.querySelector('#date1');
var date2El = document.querySelector('#date2');
var date3El = document.querySelector('#date3');
var date4El = document.querySelector('#date4');
var date5El = document.querySelector('#date5');

document.querySelector('#time1').innerHTML = moment().add(1, 'hours').format("h a");
document.querySelector('#time2').innerHTML = moment().add(2, 'hours').format("h a");
document.querySelector('#time3').innerHTML = moment().add(3, 'hours').format("h a");
document.querySelector('#time4').innerHTML = moment().add(4, 'hours').format("h a");
document.querySelector('#time5').innerHTML = moment().add(5, 'hours').format("h a");
document.querySelector('#time6').innerHTML = moment().add(6, 'hours').format("h a");
document.querySelector('#time7').innerHTML = moment().add(7, 'hours').format("h a");
document.querySelector('#time8').innerHTML = moment().add(8, 'hours').format("h a");
document.querySelector('#time9').innerHTML = moment().add(9, 'hours').format("h a");
document.querySelector('#time10').innerHTML = moment().add(10, 'hours').format("h a");
document.querySelector('#time11').innerHTML = moment().add(11, 'hours').format("h a");
document.querySelector('#time12').innerHTML = moment().add(12, 'hours').format("h a");



date1El.innerHTML = moment().add(1, 'days').format("dddd L")
date2El.innerHTML = moment().add(2, 'days').format("dddd L")
date3El.innerHTML = moment().add(3, 'days').format("dddd L")
date4El.innerHTML = moment().add(4, 'days').format("dddd L")
date5El.innerHTML = moment().add(5, 'days').format("dddd L")
cityEl.innerHTML = "(" + moment().format("dddd L") + ")";

var getForecastData = function (daysAhead, data) {
    const temp = document.querySelector('#temp' + daysAhead);
    const wind = document.querySelector('#wind' + daysAhead);
    const hum = document.querySelector('#hum' + daysAhead);
    const icon = document.querySelector('#icon' + daysAhead);

    showBtnEl.classList.remove('hidden');

    temp.innerHTML = 'Temp: ' + data.daily[daysAhead-1].temp.day;
    wind.innerHTML = 'Wind: ' + data.daily[daysAhead-1].wind_speed + ' MPH';
    hum.innerHTML = 'Humidity: ' + data.daily[daysAhead-1].humidity + '%';
    icon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.daily[daysAhead-1].weather[0].icon + '.png');
    console.log(data);
};

var getHourlyData = function (hoursAhead, data) {
    const hourly = document.querySelector('#hr' + hoursAhead);
    const temp = document.querySelector('#temp' + hoursAhead + 'Hr');
    const precip = document.querySelector('#precip' + hoursAhead + 'Hr');

    var showHourly = function() {
        hourly.classList.remove('hidden');
        hourly.classList.add('day-card');
        showBtnEl.classList.add('hidden');
        hideBtnEl.classList.remove('hidden');
        hourlyBoxEl.classList.remove('hidden');
    }

    var hideHourly = function() {
        hourly.classList.add('hidden');
        showBtnEl.classList.remove('hidden');
        hideBtnEl.classList.add('hidden');
        hourlyBoxEl.classList.add('hidden');
    }

    showBtnEl.addEventListener("click", showHourly);
    hideBtnEl.addEventListener("click", hideHourly);

    temp.innerHTML = data.hourly[hoursAhead-1].temp + '°F';
    precip.innerHTML = 'Precip. ' + data.hourly[hoursAhead-1].pop * 100 + '%';
    console.log(data);
};

var displayWeather = function(currentObj) {
    console.log('this is working')
    console.log(currentObj);
    tempEl.innerHTML = "Temp: " + currentObj.current.temp + "°F";
    windEl.innerHTML = "Wind: " + currentObj.current.wind_speed + " MPH"
    humidityEl.innerHTML = "Humidity: " + currentObj.current.humidity + " %"
    uvEl.innerHTML = "UV Index: " + currentObj.current.uvi
    iconEl.setAttribute('src', 'https://openweathermap.org/img/w/' + currentObj.current.weather[0].icon + '.png');

    if (currentObj.current.uvi <= 2) {
        uvEl.classList.add('low');
        uvEl.classList.remove('moderate');
        uvEl.classList.remove('severe');

    } else if (currentObj.current.uvi > 2 && currentObj.current.uvi <= 5) {
        uvEl.classList.remove('low');
        uvEl.classList.add('moderate');
        uvEl.classList.remove('severe');
    } else {
        uvEl.classList.remove('low');
        uvEl.classList.remove('moderate');
        uvEl.classList.add('severe');
    }
    for (i = 0; i < 5; i++) {
        getForecastData(i + 1, currentObj);
    }

    for (i = 0; i < 12; i++) {
        getHourlyData(i + 1, currentObj);
    }
   
};

var getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalWeather);
    } else {
        document.alert('Unable to get current location');
    }
}

var getLocalWeather = function(position) {
    var apiCityCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=64197eb05654a42e732c6020c1d3ec31"
    console.log(apiCityCoordinates)
    fetch(apiCityCoordinates)
    .then(function(response) {
        response.json()
        .then(function(data) {
            displayWeather(data);
        })
    })
}


var getCityCoordinates = function(city) {
    console.log(city.coord.lat, city.coord.lon);
    var apiCityCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon=" + city.coord.lon + "&units=imperial&appid=64197eb05654a42e732c6020c1d3ec31"
    console.log(apiCityCoordinates)
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

var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=64197eb05654a42e732c6020c1d3ec31";
    
    fetch(apiCurrentUrl)
    .then(function(response) {
        response.json()
        .then(function(data) {
            getCityCoordinates(data);
        });
    })

};

var saveSearch = function() {
    localStorage.setItem('history', JSON.stringify(savedSearches))
};




var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value;
    const words = city.split(" ")
    var cityName = words.join(" ");
    console.log(cityName);
    
    savedSearches.push({cityName});
    saveSearch();

    if(savedSearches) {
        for (i = 0, i < savedSearches.length; i++;) {
        console.log(savedSearches[i]);
        }
    } 


    if (city) {
        getCurrentWeatherData(city);
        cityInputEl.value = "";

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        };

        cityEl.innerHTML = words.join(" ") + " " + "(" + moment().format("L") + ")";
        console.log(cityName);


    } else {
        alert("Please enter a city name")
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);

getLocation();