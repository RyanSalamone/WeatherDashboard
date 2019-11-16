var searchButton = $(".searchButton");

var apiKey = "60417dc8895c723167aad8bffe684b73"; 

var todayWeath = $(".currentCard");

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;


// window.onload = function() {
//     this.todayWeath.style.display = "none";


// }
//    ;



searchButton.click(function () {

    var searchInput = $(".cityIn").val();

    
    var urlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlToday,
            method: "GET"
        }).then(function (response) {
            
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            
            
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            
            var todayTemp = $(".currentCard").append("<div>").addClass("card-body");
            todayTemp.empty();
            var cityName = todayTemp.append("<p>");
            
            todayTemp.append(cityName);

            
            var timeUTC = new Date(response.dt * 1000);
            cityName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            cityName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            var dailyTemp = cityName.append("<p>");
            
            cityName.append(dailyTemp);
            dailyTemp.append("<p>" + "Temperature: " + response.main.temp + " ℉" + "</p>");
            
            dailyTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
           
            dailyTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = dailyTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                dailyTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
            });

        });

        
        $.ajax({
            url: urlForecast,
            method: "GET"
        }).then(function (response) {
            
            var eachDay = [0, 8, 16, 24, 32];
            var fiveDayDiv = $(".fiveDay").addClass("card-text");
            fiveDayDiv.empty();
            
            eachDay.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=forecastColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "℉" + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});




































// $(document).ready(function () {

//     var cities = [];
//     var apiKey = "c21f5ae9d50e10de15cb11fed6650aca";

    
//     $("#searchBtn").click(function () {

//         if (localStorage.getItem("cities") !== null) {
//             test = JSON.parse(localStorage.getItem("cities[]"));
//         }

//         var city = document.getElementById("cityName").value;
//         cities.push(city);

//         var city = document.getElementById("cityName").value;
//         console.log(city);

//         var url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;
//         var url5 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;
        
        
//         $.ajax({
//             url: url1,
//             method: "GET"
//         }).done(function (response) {
//             console.log(response);

//             var lat = response.coord.lat;
//             console.log(lat);


//             var lon = response.coord.lon;
//             var urlUV = `http://api.openweathermap.org/data/2.5/uvi/forecast?appid=${apiKey}&lat=${lat}&lon=${lon}`;


//             $.ajax({
//                 url: urlUV,
//                 method: "GET",
//             }).done(function (response) {
//                 console.log(response);

//                 $(".UV").text(response[0].value);
//             });

//             if (response.weather[0].main === "Clouds") {
//                 $("#todayWeather").addClass("fas fa-cloud");


//             } else if (response.weather[0].main === "Clear") {
//                 $("#todayWeather").addClass("fas fa-sun");


//             } else if (response.weather[0].main === "Rain") {
//                 $("#todayWeather").addClass("fas fa-cloud-rain");


//             } else if (response.weather[0].main === "Snow") {
//                 $("#todayWeather").addClass("fas fa-snowflake");

//             }


//             $(".city").text(city);
//             $(".wind").text(response.wind.speed);
//             $(".humidity").text(response.main.humidity);
//             $(".temp").text(response.main.temp);

//             localStorage.setItem('cities', cities);
//             console.log(cities);
//             for (var i = 0; i < cities.length; i++) {
//                 var ctyBtn = document.createElement("BUTTON");
//                 ctyBtn.prop('value', 'cities[i]');
//                 $("#cities").prepend(ctyBtn);
                

//             }
//             // console.log(response);
//         });



//         $.ajax({
//             url: url5,
//             method: "GET"
//         }).done(function (response) {
//             // console.log(response);
//             $("#day1").text(response.list[4].dt_txt);
//             if (response.list[4].weather[0].main === "Clouds") {
//                 $("#day1Weather").addClass("fas fa-cloud");

//             } else if (response.list[4].weather[0].main === "Clear")
            
//             {
//                 $("#day1Weather").addClass("fas fa-sun");
//             } else if (response.list[4].weather[0].main === "Rain") {
//                 $("#day1Weather").addClass("fas fa-cloud-rain");
//             } else if (response.list[4].weather[0].main === "Snow") {
//                 $("#day1Weather").addClass("fas fa-snowflake");
//             }
//             $("#day1Temp").text(response.list[4].main.temp);
//             $("#day1Hum").text(response.list[4].main.humidity);

//             $("#day2").text(response.list[12].dt_txt);
//             if (response.list[12].weather[0].main === "Clouds") {
//                 $("#day2Weather").addClass("fas fa-cloud");
//             } else if (response.list[12].weather[0].main === "Clear") {
//                 $("#day2Weather").addClass("fas fa-sun");
//             } else if (response.list[12].weather[0].main === "Rain") {
//                 $("#day2Weather").addClass("fas fa-cloud-rain");
//             } else if (response.list[12].weather[0].main === "Snow") {
//                 $("#day2Weather").addClass("fas fa-snowflake");
//             }
//             $("#day2Temp").text(response.list[12].main.temp);
//             $("#day2Hum").text(response.list[12].main.humidity);

//             $("#day3").text(response.list[20].dt_txt);
//             if (response.list[20].weather[0].main === "Clouds") {
//                 $("#day3Weather").addClass("fas fa-cloud");
//             } else if (response.list[20].weather[0].main === "Clear") {
//                 $("#day3Weather").addClass("fas fa-sun");
//             } else if (response.list[20].weather[0].main === "Rain") {
//                 $("#day3Weather").addClass("fas fa-cloud-rain");
//             } else if (response.list[20].weather[0].main === "Snow") {
//                 $("#day3Weather").addClass("fas fa-snowflake");
//             }
//             $("#day3Temp").text(response.list[20].main.temp);
//             $("#day3Hum").text(response.list[20].main.humidity);

//             $("#day4").text(response.list[28].dt_txt);
//             if (response.list[28].weather[0].main === "Clouds") {
//                 $("#day4Weather").addClass("fas fa-cloud");
//             } else if (response.list[28].weather[0].main === "Clear") {
//                 $("#day4Weather").addClass("fas fa-sun");
//             } else if (response.list[28].weather[0].main === "Rain") {
//                 $("#day4Weather").addClass("fas fa-cloud-rain");
//             } else if (response.list[28].weather[0].main === "Snow") {
//                 $("#day4Weather").addClass("fas fa-snowflake");
//             }
//             $("#day4Temp").text(response.list[28].main.temp);
//             $("#day4Hum").text(response.list[28].main.humidity);

//             $("#day5").text(response.list[36].dt_txt);
//             if (response.list[36].weather[0].main === "Clouds") {
//                 $("#day5Weather").addClass("fas fa-cloud");
//             } else if (response.list[36].weather[0].main === "Clear") {
//                 $("#day5Weather").addClass("fas fa-sun");
//             } else if (response.list[36].weather[0].main === "Rain") {
//                 $("#day5Weather").addClass("fas fa-cloud-rain");
//             } else if (response.list[36].weather[0].main === "Snow") {
//                 $("#day5Weather").addClass("fas fa-snowflake");
//             }
//             $("#day5Temp").text(response.list[36].main.temp);
//             $("#day5Hum").text(response.list[36].main.humidity);
//         });


//     });

// });