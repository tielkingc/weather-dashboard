var pullApi = function(city, date) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+
        city+
        '&appid=03150e865e408eec25cb79def73567fc'

    /*fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=39.9667'+
        '&lon=-83.0166&units=imperial&exclude=hourly,minutely' +
        
        '&appid=03150e865e408eec25cb79def73567fc'*/
    )
        // Convert the response to JSON
        .then(function(response) {
        var data = response.json();

        console.log(data.);
        });
}

$(".city-search").on("click", function() {
    var searchCity = document.querySelector(".city").value;

    var currentDate = moment().format("MM/DD/YYYY");
    console.log(currentDate);

    var timeStamp = moment().unix()
    console.log(timeStamp)

    pullApi(searchCity, timeStamp)

    for (var i = 1; i < 6; i++) {
        var nextUnix = moment().unix() + (86400 * i)
        var nextDate = moment().add(i,"d").format("MM/DD/YYYY")
        var cardEl = document.querySelector("#card" + i);
        cardEl.innerHTML = nextDate
        //console.log(nextDate)
        pullApi(searchCity, nextUnix)

    }
    
})



var threeDays = moment().add(3,"d").format("MM/DD/YYYY")
console.log(threeDays);


