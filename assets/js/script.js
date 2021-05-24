var savedCities = localStorage.getItem('cities');
if (savedCities === [] || savedCities === null) {
    var localCities = ['San Diego']
}
else {
    localCities = JSON.parse(savedCities)
}
for (var x = 0; x < localCities.length; x++){
    var listEl = document.querySelector(".city-list")
    var cityName = document.createElement('p')
    cityName.classList.add("savedSearch")
    cityName.classList.add(x)
    cityName.innerHTML = localCities[x]
    listEl.appendChild(cityName)
}
var pullApi = function(city) {

    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+
        city+
        '&appid=03150e865e408eec25cb79def73567fc'
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
    var cityLat = response[0].lat;
    var cityLon = response[0].lon;
    fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat='+
        cityLat+
        '&lon='+
        cityLon+
        '&units=imperial&exclude=hourly,minutely'+
        '&appid=03150e865e408eec25cb79def73567fc'
    )
    .then(function(response) {
        //console.log(response.json())
        return response.json()
    })
    .then(function(response) {
        var weatherStats = [
            response.daily[0].temp.day,
            response.daily[0].wind_speed,
            response.daily[0].humidity,
            response.daily[0].uvi,
            response.daily[0].weather[0].icon
        ]
        
        var currentEl = document.querySelector(".current")
        currentEl.innerHTML = ""

        var currentDate = moment().format("MM/DD/YYYY");

        var dateH5 = document.createElement('h4')
        
        var weatherIcon = document.createElement('img')
        weatherIcon.src = "http://openweathermap.org/img/w/" + weatherStats[4] + ".png"
        
        dateH5.innerHTML = city.charAt(0).toUpperCase() + 
        city.slice(1) + 
        ": (" + currentDate + ")"

        dateH5.appendChild(weatherIcon)

        currentEl.appendChild(dateH5)

        var tempP = document.createElement('p')
        tempP.innerHTML = "Temp: " + weatherStats[0]
        currentEl.appendChild(tempP)

        var windP = document.createElement('p') 
        windP.innerHTML = "Wind: " + weatherStats[1]
        currentEl.appendChild(windP)

        var humP = document.createElement('p')
        humP.innerHTML = "Humidiy: " + weatherStats[2]
        currentEl.appendChild(humP)

        var uvS= document.createElement('span')
        uvS.innerHTML = weatherStats[3]
        if (weatherStats[3] < 3) {
            uvS.setAttribute('style', 'background-color: green; padding: 5px; border-radius: 5px;')
        }
        else if (weatherStats[3] < 5) {
            uvS.setAttribute('style', 'background-color: orange; padding: 5px; border-radius: 5px;')
        }
        else {
            uvS.setAttribute('style', 'background-color: red; padding: 5px; border-radius: 5px;')
        }
        var uvP = document.createElement('p')
        uvP.innerHTML = "UV Index: "
        uvP.appendChild(uvS)
        currentEl.appendChild(uvP)

        for (var i = 1; i < 6; i++) {
            var weatherStats = [
                response.daily[i].temp.day,
                response.daily[i].wind_speed,
                response.daily[i].humidity,
                response.daily[i].weather[0].icon
            ]
            var currentDate = moment().add(i,"d").format("MM/DD/YYYY");

            var cardEl = document.querySelector("#card" + i);
            cardEl.innerHTML = ""
            var dateH5 = document.createElement('h6')
            dateH5.innerHTML = currentDate
            cardEl.appendChild(dateH5)

            var weatherIcon = document.createElement('img')
            weatherIcon.src = "http://openweathermap.org/img/w/" + weatherStats[3] + ".png"
            cardEl.appendChild(weatherIcon)

            var tempP = document.createElement('p')
            tempP.innerHTML = "Temp: " + weatherStats[0]
            cardEl.appendChild(tempP)

            var windP = document.createElement('p') 
            windP.innerHTML = "Wind: " + weatherStats[1]
            cardEl.appendChild(windP)

            var humP = document.createElement('p')
            humP.innerHTML = "Humidiy: " + weatherStats[2]
            cardEl.appendChild(humP)

        }
    })
    
    });
    //return weatherStats
    
}

$(".city-search").on("click", function() {
    var searchCity = document.querySelector(".city").value;

    for (var ret = 0; ret < localCities.length; ret++) {
        
        if (localCities[ret] === searchCity) {
            var hasCity = true;
        }
    }
    if (hasCity) {
        

        pullApi(searchCity)
    }
    else {
        var listEl = document.querySelector(".city-list")
        var cityName = document.createElement('p')
        cityName.classList.add("savedSearch")
        cityName.classList.add(x + 1)
        cityName.innerHTML = searchCity
        listEl.appendChild(cityName)
    
        localCities.push(searchCity)
    
        localStorage.setItem('cities', JSON.stringify(localCities))
        pullApi(searchCity)
    }
    

    

    
    
})

pullApi('San Diego')

for (var listNum = 0; listNum < localCities.length; listNum++) {
    $('.' + listNum).on('click', function() {
        //var randoVar = document.querySelector(this)
        var randoCity = this.innerHTML
        pullApi(randoCity)
    })
}

$(".delete-btn").on('click', function() {
    localStorage.setItem('cities', JSON.stringify(["San Diego"]))
    var citList = document.querySelector(".city-list")
    citList.innerHTML = ""
})