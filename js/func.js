function state_scan() {

    axios.get(url_base)
        .then(function (response) {
            _select_state.innerHTML = ` `;
            find(response.data, 'state', _select_country.value);

        });
}

function town_scan() {
    console.log('aaa');
    if (_town_letters.value.length > 1)
        axios.get(url_base)
            .then(function (response) {
                _select_town.innerHTML = ` `;
                _town_letters.value = _town_letters.value.toUpperCase();

                array = find(response.data, 'town', _select_country.value, _select_state.value, _town_letters.value, 'get');




            });


}
function find(data, type, country, state, name, mode) {
    let array = [];

    array = unique(data, type, country, state, name);

    if (typeof (name) != 'string')
        array.sort();
    else {

        array.sort((prev, next) => {
            if (prev.name < next.name) return -1;
            if (prev.name < next.name) return 1;
        });

    }

    if (type == 'country')
        for (i in array) {
            _select_country.innerHTML += `<option  value="${array[i]}">${array[i]}</option>`
        }
    if (type == 'state'){
        for (i in array) {
            if (array[i] != "" && array[i] != '00')
                _select_state.innerHTML += `<option  value="${array[i]}">${array[i]}</option>`
        }
        
    }
    if (type == 'town')
        for (i in array) {

            if (array[i].name != "" && array[i].name != '00')
                _select_town.innerHTML += `<option  value="${array[i].id}">${array[i].name}</option>`
        }
    
    if (mode == 'get') {
        return array;
    }
}

function unique(arr, type, country, state, name) {

    let new_arr = [];
    let change_array = [];
    let town_obj = [];
    let final_array = [];
    let inc_final_array = 0;
    let bool;
    let change_check;
    let change_post_check;
    let id_array = [];
    if (type == 'country')
        for (i in arr) {
            new_arr[0] = arr[0].country;
            for (j in new_arr) {

                if (new_arr[j] != arr[i].country)
                    bool = true;
                else { bool = false; break; }


            }
            if (bool == true && arr[i].country != "") {
                new_arr.push(arr[i].country);
            }
        }
    if (type == 'state')
        for (i in arr) {
            if (arr[i].country == country) {
                new_arr[0] = arr[0].state;
                for (j in new_arr) {

                    if (new_arr[j] != arr[i].state)
                        bool = true;
                    else { bool = false; break; }


                }
                if (bool == true && arr[i].state != " ") {
                    new_arr.push(arr[i].state);
                }
            }
        }

    if (type == 'town') {

        for (i in arr) {
            if (arr[i].country == country && arr[i].state == state) {

                town_obj[0] = {
                    name: "",
                    id: 0
                }

                for (j in town_obj) {

                    if (town_obj[j].name != arr[i].name)
                        bool = true;
                    else { bool = false; break; }


                }
                if (bool == true && arr[i].name != "") {
                    town_obj.push({ name: arr[i].name, id: arr[i].id });
                }
                delete town_obj[0];
            }
        }

        for (i in town_obj) {

            let string_fast = town_obj[i].name;
            string_fast = string_fast.toUpperCase();
            town_obj[i].ShowName = string_fast;

        }
        if (country == 'MD' || country == 'IR' || country == 'PL' || country == 'RO') {
            for (i in town_obj) {
                change_array[i] = "";

                for (j in town_obj[i].ShowName)
                    for (k in letters_change_array) {
                        if (town_obj[i].ShowName[j] == letters_change_array[k]) {
                            change_check = true;
                        }
                    }
                if (change_check == true)
                    for (j in town_obj[i].ShowName) {

                        for (k in letters_change_array) {
                            if (town_obj[i].ShowName[j] == letters_change_array[k]) {
                                change_array[i] += letters_change_array_EN[k];
                                change_post_check = true;
                            }


                        }
                        if (change_post_check == false)
                            change_array[i] += town_obj[i].ShowName[j];


                        change_post_check = false;
                    }
                town_obj[i].ShowName = change_array[i];
            }


        }

        for (i in town_obj) {



            for (k in name) {
                if (name[k] == town_obj[i].ShowName[k]) {
                    bool = true;
                }
                else { bool = false; break; }


            }
            if (bool == false) {
                delete town_obj[i];
                

            }

        }

        return town_obj;
    }

    return new_arr;

}







function info_about_your_GMT() {

    let ___s = new Date();
    let gmt_pos = ___s.toTimeString().search('GMT');
    if (___s.toTimeString()[gmt_pos] + 4 != '-')
        your_gmt = parseInt(___s.toTimeString()[gmt_pos + 4] + ___s.toTimeString()[gmt_pos + 5])
    else your_gmt = parseInt(___s.toTimeString()[gmt_pos + 4] + ___s.toTimeString()[gmt_pos + 5] + ___s.toTimeString()[gmt_pos + 6])
    return your_gmt;
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
    int = 0;
    console.log(data);

    town_temp_info.innerHTML = parseInt(data.data.main.temp - 273.15) + " °C";
    town_visual_info.innerHTML = data.data.weather[0].main;
    town_wind_info.innerHTML = data.data.wind.speed + " m/s";
    times = data.data.timezone;
    current_gmt = parseInt(times / 60 / 60);

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

    __time = new Date();
    __time.setHours(__time.getHours() - your_gmt + parseInt(current_gmt));

    let __hours = __time.getHours();
    let __minutes = __time.getMinutes();
    let __seconds = __time.getSeconds();

     
    __hours = String(__hours).length != 2 ? __hours = '0' + __hours : __hours = __hours;
    __minutes = String(__minutes).length != 2 ? __minutes = '0' + __minutes : __minutes = __minutes;
    __seconds = String(__seconds).length != 2 ? __seconds = '0' + __seconds : __seconds = __seconds;
    town_date_info.innerHTML = `${__hours}:${__minutes}:${__seconds}`;
    return requestAnimationFrame(time)
}

function show_weather(){
    document.querySelector('.container').style.bottom = 0;
    setTimeout(() => {document.getElementById('serious').style.top = 0;}, 1000); 
    document.querySelector('.infs').style.top = 0;
}