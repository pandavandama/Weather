let url = 'https://api.openweathermap.org/data/2.5/weather?appid=c4140dc62db74678e058b647104492a1';
let urltime = 'http://worldtimeapi.org/api/timezone/Europe/London';
let url_base = 'city.list.json';
let box_status;
let _select_town = document.getElementById('select_town_s');
let _select_country = document.getElementById('select_country');
let _select_state = document.getElementById('select_state');
let _town_letters = document.getElementById('town_letters');
let _town = document.querySelector('.town');
let id = 0;
let _data;
let letters_change_array = ['Ă', 'Â', 'Î', 'Ş','Ș', 'Ţ','Ț',];
let letters_change_array_EN = ['A', 'A', 'I', 'S', 'S', 'T','T'];
let state;

let town_name_info = document.getElementById('town_name_info');
let town_temp_info = document.getElementById('town_temp_info');
let town_wind_info = document.getElementById('town_wind_info');
let town_date_info = document.getElementById('town_date_info');
let town_visual_info = document.getElementById('town_visual_info');
let icon1 = document.getElementById('icon1');
let times;
let your_time_const=7200;
let your_time = Number(7200+'000');
// function(){
//     let string_zeros;
//     if(your_time)
//     parseInt(7200+'000');}



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

                town_obj[0] ={
                    name:"",
                    id:0
                }
                
                for (j in town_obj) {

                    if (town_obj[j].name != arr[i].name)
                        bool = true;
                    else { bool = false; break; }


                }
                if (bool == true && arr[i].name != "") {
                    town_obj.push({name:arr[i].name,id:arr[i].id});
                }
                delete town_obj[0];
            }
        }
        
        for (i in town_obj) {
            
             let string_fast = town_obj[i].name;
             string_fast = string_fast.toUpperCase();
             town_obj[i].ShowName = string_fast;
             
        }
        if (country == 'MD' || country == 'IR' || country == 'PL' || country == 'RO'){
            for (i in town_obj) {
                change_array[i]= "";

                for (j in town_obj[i].ShowName)
                    for (k in letters_change_array) {
                        if (town_obj[i].ShowName[j] == letters_change_array[k]) {
                            change_check = true;
                        }
                    }
                if(change_check==true)
                for(j in town_obj[i].ShowName){

                    for (k in letters_change_array) {
                        if(town_obj[i].ShowName[j]==letters_change_array[k]){
                        change_array[i]+= letters_change_array_EN[k];
                        change_post_check=true;
                    }
                        
                        
                    }
                    if(change_post_check==false)
                    change_array[i]+=town_obj[i].ShowName[j];
                    

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
                // final_array[inc_final_array] = town_obj[i];
                // inc_final_array++;

            }

        }

        return town_obj;
    }
    
    return new_arr;

}





function find(data, type, country, state, name,mode) {
    let array = [];

    array = unique(data, type, country, state, name);
    
    if(typeof(name)!='string')
    array.sort();
    else{
        
        array.sort((prev, next) => {
            if ( prev.name < next.name ) return -1;
            if ( prev.name < next.name ) return 1;
        });
        
    }
    
    if (type == 'country')
        for (i in array) {
            _select_country.innerHTML += `<option  value="${array[i]}">${array[i]}</option>`
        }
    if (type == 'state')
        for (i in array) {
            if (array[i] != "" && array[i] != '00')
                _select_state.innerHTML += `<option  value="${array[i]}">${array[i]}</option>`
        }
    if (type == 'town')
        for (i in array) {

            if (array[i].name != "" && array[i].name != '00')
                _select_town.innerHTML += `<option  value="${array[i].id}">${array[i].name}</option>`
        }
    
    if(mode=='get'){
        return array;
    }
}




axios.get(url_base)
    .then(function (response) {
        find(response.data, 'country');


    });

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

                array = find(response.data, 'town', _select_country.value, _select_state.value, _town_letters.value,'get');


                
                
            });


}












