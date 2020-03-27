
axios.get(urltime) .then(function(response){
let box = document.getElementById('box'); box.innerText = response.data.utc_datetime; console.log(response.data.utc_datetime)});
let but = 0;
let gmt0;

let monitor = requestAnimationFrame(status);
function status(){
    
    if(box.innerText!=""){
        gmt0= box.innerText;
        gmt0 = Date.parse(gmt0);
        but++;}

    if(but==0)
    return requestAnimationFrame(status);
}

function set_weather() {
    id = _select_town.value;
    axios.get('https://api.openweathermap.org/data/2.5/weather?id=' + id + '&appid=c4140dc62db74678e058b647104492a1')
        .then(function (response) {
            show_weather_by_id(response, id);

        }
        );
}

function show_weather_by_id(data, id) {

    console.log(data);

    town_temp_info.innerHTML = parseInt(data.data.main.temp - 273.15) + " °C";
    town_visual_info.innerHTML = data.data.weather[0].main;
    town_wind_info.innerHTML = data.data.wind.speed + " m/s";
    times=data.data.timezone;

    
    let anim = requestAnimationFrame(time);
    
    axios.get(url_base).then(function (response) {

        id = Number(id);

        for (i in response.data) {
            if (response.data[i].id == id)
                town_name_info.innerHTML = response.data[i].name;
        }

    });

}
function time() {

    let dats = new Date();
    dats.setTime((gmt0) + parseInt(times+'00'));
    town_date_info.innerHTML = "Query in time: " + dats;
    
    

    return requestAnimationFrame(time);
}