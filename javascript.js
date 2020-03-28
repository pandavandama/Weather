document.body.onload = function(){
your_gmt = info_about_your_GMT();


axios.get(url_base)
    .then(function (response) {
        find(response.data, 'country');


    });


}








