var searchBtnEl = $(".btn");
var searchCityEl = $("#city-search");
var storedCityEl = $(".stored-city");
var todayListEl = $(".today");
var apiKey = "&appid=c4e7bb5dffaa5190296f9adfad6f11dd";
var storedCity = [
  localStorage.getItem("city-1"),
  localStorage.getItem("city-2"),
  localStorage.getItem("city-3"),
  localStorage.getItem("city-4"),
  localStorage.getItem("city-5"),
  localStorage.getItem("city-6"),
  localStorage.getItem("city-7"),
  localStorage.getItem("city-8"),
];

function populateCities() {
  storedCityEl.each(function (i) {
    index = i + 1;
    var text = localStorage.getItem("city-" + index);
    $(this).text(text);
    if (storedCityEl.eq(i).text() == "") {
      storedCityEl.eq(i).hide();
    } else if (storedCityEl.eq(i).text() == "null") {
      storedCityEl.eq(i).hide();
    } else {
      storedCityEl.eq(i).show();
    }
  });
}

populateCities();

searchBtnEl.click(function () {
  if ($(this).attr("id") == "search-btn") {
    var city = searchCityEl.val();
  } else {
    var city = $(this).text();
  }

  var urlRequest =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    apiKey +
    "&units=imperial";

  if (storedCity.length < 8) {
    storedCity.unshift(city);
  } else {
    storedCity.pop();
    storedCity.unshift(city);
  }

  for (var i = 0; i < storedCityEl.length; i++) {
    var index = i + 1;
    var storedID = "city-" + index;
    localStorage.setItem(storedID, storedCity[i]);
  }

  populateCities();

  fetch(urlRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var coordinates = {
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
      console.log(data);
      var convertDate = new Date(data.dt * 1000);
      var date = convertDate.toLocaleDateString();
      todayListEl.eq(0).text(data.name + " " + date);
      todayListEl.eq(1).text("Temp: " + data.main.temp + "\u00B0F");
      todayListEl.eq(2).text("Wind: " + data.wind.speed + "MPH");
      todayListEl.eq(3).text("Humidity: " + data.main.humidity + "%");
      fiveDay(coordinates);
    });
});

function fiveDay(coordinates) {
  var lat = coordinates.lat;
  var lon = coordinates.lon;
  fiveDayURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    apiKey +
    "&units=imperial";

  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (dayData) {
      console.log(dayData);
      var dayEl = $(".day");
      var tempEl = $(".temp");
      var windEl = $(".wind");
      var humidEl = $(".humid");
      dayEl.each(function (i) {
        let index = i * 8;
        var convertDate = new Date(dayData.list[index].dt * 1000);
        var date = convertDate.toLocaleDateString();
        $(this).text(date);
      });
      tempEl.each(function (i) {
        let index = i * 8;
        $(this).text("Temp: " + dayData.list[index].main.temp + "\u00B0F");
      });
      windEl.each(function (i) {
        let index = i * 8;
        $(this).text("Wind: " + dayData.list[index].wind.speed + "MPH");
      });
      humidEl.each(function (i) {
        let index = i * 8;
        $(this).text("Humidity: " + dayData.list[index].main.humidity + "%");
      });
    });
}
