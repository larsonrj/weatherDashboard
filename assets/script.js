var searchBtnEl = $(".btn");
var searchCityEl = $("#city-search");
var storedCityEl = $(".stored-city")
var apiKey = "&appid=c4e7bb5dffaa5190296f9adfad6f11dd";
var storedCity = [localStorage.getItem("city-1"), localStorage.getItem("city-2"), localStorage.getItem("city-3"), localStorage.getItem("city-4"), localStorage.getItem("city-5"), localStorage.getItem("city-6"), localStorage.getItem("city-7"), localStorage.getItem("city-8")]


function populateCities (){
    storedCityEl.each(function (i) {
    index=i+1;
    var text = localStorage.getItem("city-" + index);
    $(this).text(text);
})
};

console.log(searchCityEl.val())
populateCities()

searchBtnEl.click(function () {
    if ($(this).attr("id") =="search-btn") {
    var city = searchCityEl.val();}
    else var city = $(this).text();

    var urlRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    if (storedCity.length < 8) {
        storedCity.unshift(city);
    }
    else {
        storedCity.pop();
        storedCity.unshift(city);
    };
    
    for (var i=0; i<storedCityEl.length; i++) {
    var index = i+1;
    var storedID = "city-" + index;
    console.log(storedID)
    localStorage.setItem(storedID, storedCity[i])
    };

    populateCities();

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
    fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + apiKey + "&cnt=5";
    
    fetch(fiveDayURL)
    .then(function (response) {
        return response.json();
      })
      .then(function (dayData) {
        console.log(dayData)
        $(".today li:nth-child(1)").text()
        var weekCast = $(".week")
    }
    )
}
