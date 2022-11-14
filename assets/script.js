var searchBtnEl = $("#search-btn");
var searchCityEl = $("#city-search");
var storedCityEl = $(".stored-city")
var apiKey = "&appid=c4e7bb5dffaa5190296f9adfad6f11dd";
const storedCity = [];

function populateCities (){
    storedCityEl.each(function (i) {
    index=i+1;
    var text = localStorage.getItem("city-" + index);
    $(this).text(text);
})
};

searchBtnEl.click(function () {
    var city = searchCityEl.val();
    var urlRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;
    localStorage(city);
    fetch(urlRequest)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var coordinates = {
            lat: data.city.coord.lat,
            lon: data.city.coord.lon
        }
        
        
        fiveDay(coordinates)
    })
})

function fiveDay(coordinates) {
    var lat = coordinates.lat;
    var lon = coordinates.lon;
    fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + apiKey;
    
    fetch(fiveDayURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (dayData) {
        console.log(dayData)})
      }

function localStorage (city) {
    if (storedCity.length < 8) {
        storedCity.unshift(city);
    }
    else {
        storedCity.pop();
        storedCity.unshift(city);
    };
    };


