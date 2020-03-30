let change_text = document.getElementById('change_text');
let rel_block_id1 = document.getElementById('rel_block_id1');

let monitor = requestAnimationFrame(show);

function show(){
    console.log(pageYOffset);
    if(pageYOffset<1300)
    {
        change_text.innerHTML = 'Как же возникла наша компания?'
        opts.backgroudColor = "rgb(231, 223, 221)";

    }
    if(pageYOffset>1300)
    {   
        change_text.innerHTML = 'Это очень темная история...'
        change_text.style.color = 'white';
        opts.backgroudColor = "black";
    }
    return requestAnimationFrame(show)
}