document.body.onload = function(){
your_gmt = info_about_your_GMT();


axios.get(url_base)
    .then(function (response) {
        
        find(response.data, 'country');
        console.log('страница загружена');
        document.getElementById('load').style.opacity = 0.1;
        document.querySelector('.load').style.opacity = 0.1;
        setTimeout(() =>{
        document.getElementById('load').style.display ='none',document.querySelector('.load').style.display = 'none'},500);
        setTimeout(()=>show_weather(),500);
    });


let font_correction = requestAnimationFrame(font_adaptive);


}








