const key = "94a836c25cda402c9d5d5be66aa76233";
var city = ""
var url_1 = "";
var url_2 = "";
var city_count = 0;
let falseInitialized = false;
let trouble_1 = true;//previous search button area

onload=function(){

    //Initialize the button search area buttons - Diables buttons until they get a city.
    for(var i=0; i < 10; i++){
        var currentButton = document.getElementById("button_search_area");
        currentButton.children[i].style.backgroundColor = "white";
        currentButton.children[i].style.borderColor = "white";
        currentButton.children[i].disabled = true;
    }
    
    //Re-populate previous search buttons
    //Latest search goes on top
    city_count = localStorageEntries();
    var index = Math.min(city_count, 10);
    for(var i = 0; i < index; i++){
        var target = document.getElementById("b"+i);
        target.innerHTML=localStorage.getItem("weather_dashboard"+(index-1-i));
        target.disabled = false;
        target.style.backgroundColor = "lightgrey";        
    }
    city = document.getElementById("b0").innerHTML;  

    mainProcess();  
    
    //Setup main search input and submit button. 
    const citySearchButton = document.getElementById("city_search_button");
    citySearchButton.addEventListener("click", function(event){
        if(event)
        var cityInput=document.getElementById("city_search_input");
        city = cityInput.value;
        mainProcess();
    });
    //'Enter' key trigger
    const citySearchInput = document.getElementById("city_search_input");
    citySearchInput.addEventListener("keydown", function(event){
        var key = event.code
        if(key=="Enter"){
            var cityInput=document.getElementById("city_search_input");
            city = cityInput.value;
            cityInput.value = "";
            mainProcess();
        }
    });
    //Button search area eventListener.
    const buttonSearchArea = document.getElementById("button_search_area");
    buttonSearchArea.addEventListener("click", function(event){
        var buttonClicked = document.getElementById(event.target.id)
        city = buttonClicked.innerHTML;
        mainProcess();
    });
}

// Main Process
function mainProcess() {
    var temp;
    var wind;
    var humidity;
    var uv_index;
    var weatherType;

    
    url_1 = "https://api.weatherbit.io/v2.0/current?mode:'no-cors'&units=I&city="+city+"&key="+key;
    url_2 = "https://api.weatherbit.io/v2.0/forecast/daily?&mode:'no-cors'&days=5&units=I&city="+city+"&key="+key;    
    fetch(url_1)
        .then(function (response) {
            //Bail
            if(response.status == 204 || response.status < 200 || response.status > 299){
                return;
            }
            response.json()
                .then(function (data) {
                    
                    data = JSON.parse(JSON.stringify(data));
                    const interim_0 = Object.entries(data);
                    interim_1 = interim_0[0][1];
                    entries = interim_1[0];
                    cityName = entries.city_name;
                    temp = entries.temp;
                    wind = entries.wind_spd;
                    humidity = entries.rh;
                    uv_index = (Math.round(entries.uv * 100)) / 100;
                    populate_1(cityName, temp, wind, humidity, uv_index);
                })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    fetch(url_2)
        .then(function (response) {
            //Bail
            if(response.status == 204 || response.status < 200 || response.status > 299){
                return;
            }
            response.json()
                .then(function (data) {
                    data = JSON.parse(JSON.stringify(data));
                    const interim_0 = Object.entries(data);
                    interim_1 = interim_0[0][1];
                    for (var i = 0; i < 5; i++) {
                        entries = interim_1[i];
                        temp = entries.temp;
                        wind = entries.wind_spd;
                        humidity = entries.rh;
                        weatherCode = entries.weather.code;
                        populate_2(temp, wind, humidity, weatherCode, i);
                    }
                })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//Populates output fields from the single day city forcast url call.
function populate_1(c, t, w, h, u){
    //Re-populates previous search buttons upon a new search
    var entries = Math.min(localStorageEntries(), 9);
    var previousButton;
    var currentButton;

    for(var i = entries; i > 0; i--){
        currentButton= document.getElementById("button_search_area").children[i];
        previousButton= document.getElementById("button_search_area").children[i-1];
        currentButton.innerHTML = previousButton.innerHTML;
        currentButton.disabled = false;
        currentButton.style.backgroundColor = "lightgrey";        
        localStorage.setItem("weather_dashboard"+entries,c);
    }   
    
    currentButton= document.getElementById("button_search_area").children[0]  
    currentButton.innerHTML = c;
    currentButton.disabled = false;
    currentButton.style.backgroundColor = "lightgrey";
    localStorage.setItem("weather_dashboard"+entries,c);
    entries = Math.min(localStorageEntries(), 9);
    city_count++;
    
    //5-day forcast
    var card_city_date = document.getElementById("city_forecast").children[0];
    card_city_date.innerHTML = c+" ("+moment().format('L')+")";
    var card_city_temp = document.getElementById("city_forecast").children[1];
    card_city_temp.innerHTML = "Temp: "+t+"\u00B0F";
    var card_city_wind = document.getElementById("city_forecast").children[2];
    card_city_wind.innerHTML = "Wind: "+w+" MPH";
    var card_city_humidity = document.getElementById("city_forecast").children[3];
    card_city_humidity.innerHTML = "Humidity: "+h+"%";
    var card_city_uv_lable = document.getElementById("city_forecast").children[4];
    card_city_uv_lable.innerHTML = "UV index: ";
    var card_city_uv = document.getElementById("city_forecast").children[5];
    card_city_uv.innerHTML = u;
    if(u <= 2)
        document.getElementById("city_uv").style.backgroundColor = "green";
    else if (u <= 5)
        document.getElementById("city_uv").style.backgroundColor = "yellow";    
    else if (u <= 7)
        document.getElementById("city_uv").style.backgroundColor = "orange";
    else if (u <= 10)
        document.getElementById("city_uv").style.backgroundColor = "red";    
    else 
        document.getElementById("city_uv").style.backgroundColor = "violet";
    var card0_date = document.getElementById("day-0").children[0];
    card0_date.innerHTML = moment().add(1, 'days').format('L');
    var card1_date = document.getElementById("day-1").children[0];
    card1_date.innerHTML = moment().add(2, 'days').format('L');
    var card2_date = document.getElementById("day-2").children[0];
    card2_date.innerHTML = moment().add(3, 'days').format('L');
    var card3_date = document.getElementById("day-3").children[0];
    card3_date.innerHTML = moment().add(4, 'days').format('L');
    var card4_date = document.getElementById("day-4").children[0];
    card4_date.innerHTML = moment().add(5, 'days').format('L')
}

//Populates output fields from the 16 day city forcast url call.
function populate_2(t, w, h, c, day){
    var card_icon = document.getElementById("day-"+day).children[1];
    card_icon.innerHTML = "<img src=\"./assets/images/"+c+".png\" width = \"40\" height = \"40\"/>";
    var card_temp = document.getElementById("day-"+day).children[2];
    card_temp.innerHTML = "Temp: "+t+"\u00B0F";
    var card_wind = document.getElementById(("day-"+day)).children[3];
    card_wind.innerHTML = "Wind: "+w+" MPH";
    var card_humidity = document.getElementById(("day-"+day)).children[4];
    card_humidity.innerHTML = "Humidity: "+h+"%";
}

//Counts app records in localStorage
function localStorageEntries(){
    var count = 0;
    for(var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        if(key.substring(0,17) == "weather_dashboard")
            count++
    }
    return(count);
}


