$(".city-search").on("click", function() {
    var city = document.querySelector(".city").value;

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&units=imperial&appid=03150e865e408eec25cb79def73567fc'
    )
        // Convert the response to JSON
        .then(function(response) {
        console.log(response.json());
        });
})

