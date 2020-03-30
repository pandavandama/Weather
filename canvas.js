
let
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    opts = {
        lineWidth: 0.5,
        lineColor: "rgba(255,255,255,opacity)",
        
        backgroudColor: "rgb(231, 223, 221)",
        particleColor: "#fcfcfc",

        particleAmount:15,

        defaultRadius:2,
        addedRadius:2,

        defaultSpeed: 1,
        addedSpeed: 2,
        
        communicationRadius: 200,
    },
    particles = [],
    Particle = function (Xpos,Ypos) {
        this.x = Xpos ? Xpos : Math.random()*w;
        this.y = Ypos ? Ypos : Math.random()*h;

        this.speed = opts.defaultSpeed + Math.random()*opts.addedSpeed;
        this.directionAngle = Math.floor(Math.random()*360);
        this.color = opts.particleColor;
        this.radius = opts.defaultRadius + Math.random()* opts.addedRadius;
        this.d = {
            x: Math.cos(this.directionAngle)*this.speed,
            y: Math.sin(this.directionAngle)*this.speed,
        }
        this.update = function(){
            this.border();
            this.x += this.d.x;
            this.y += this.d.y;

        }
        this.border = function(){
            if(this.x >= w || this.x <= 0){
                this.d.x *= -1;
            }
            if(this.y >= h || this.x <=0){
                this.d.y *= -1;
            }
            this.x > w ? this.x = w : this.x;
            this.y > h ? this.y = h : this.y;
            this.x < 0 ? this.x = 0 : this.x;
            this.y < 0 ? this.x = 0 : this.y;
        };
        this.draw = function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y,this.radius,0,Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    },
    checkDistance = function (x1, y1, x2, y2) {

        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    communicatePoints = function(point1,father){
        for(let i = 0;i<father.length;i++){
            let distance = checkDistance(point1.x,point1.y,father[i].x,father[i].y);
            let opacity = 1 - distance/opts.communicationRadius;
            if(opacity > 0){
                ctx.lineWidth = opts.lineWidth;
                ctx.strokeStyle = opts.lineColor.replace("opacity", opacity);
                ctx.beginPath();
                ctx.moveTo(point1.x,point1.y);
                ctx.lineTo(father[i].x, father[i].y);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }




function setup() {
    for(let i = 0; i<opts.particleAmount;i++){
        particles.push(new Particle());

    }
    
    window.requestAnimationFrame(loop);
}
function loop() {
    ctx.fillStyle = opts.backgroudColor;
    ctx.fillRect(0,0,w,h);
    
    for(let i = 0;i<particles.length;i++){
        
        particles[i].update();
        particles[i].draw();
    }
    for (let a =0; a<particles.length; a++){
        communicatePoints(particles[a],particles);


    }
    window.requestAnimationFrame(loop);
}

setup();

canvas.addEventListener('click',function(e){
particles.push( new Particle(e.pageX,e.pageY)
),false
})

