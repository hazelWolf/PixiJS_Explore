var app = new PIXI.Application(window.innerWidth,window.innerHeight);
app.view.style.position = "absolute";
app.view.style.display = "block";
document.body.appendChild(app.view)

var bg = new PIXI.Sprite.fromImage("../assets/BG.png");

bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);

//Creating Loader
var Idleloader = new PIXI.loaders.Loader();
var gameloader = new PIXI.loaders.Loader();
//Velocities
var vx = 5 ;
var vy = 5;
var flag = 0;
//Score
var count =0;
var score;
var gameState = 0; 
//Bhoot awaz
const sound =  PIXI.sound.Sound.from({url :'../assets/hauntedhouse.wav', loop:true});
sound.play();
const soundPlay =  PIXI.sound.Sound.from({url :'../assets/attack.wav', loop:true});
//Anime holders
const idleContainer = new PIXI.Container();
const muteContain = new PIXI.Container();
const pumpContainer = new PIXI.Container();
const gameContainer = new PIXI.Container();
muteContain.width = 50;
muteContain.height = 50;

//Buttons
var buttoncontainer = new PIXI.Container();

 //Start Stop button
 var buttonIdeal = PIXI.Texture.fromImage("../assets/black_play.png");

 var buttonDown =  PIXI.Texture.fromImage("../assets/play_stop.png");

 var gameControButton =  new PIXI.Sprite(buttonIdeal);

gameControButton.buttonMode = true;
    gameControButton.interactive = true;
    gameControButton.x =20;
    gameControButton.y = 20;
    gameControButton.height = 75;
    gameControButton.width = 75;
    gameControButton.on('click', onStartStop)
    buttoncontainer.addChild(gameControButton);

function onStartStop(){
    if(flag == 0){
        count=0;
        sound.stop();
        soundPlay.play();
        gameState = 1;
        this.texture =  buttonDown;
        console.log("start");
        app.stage.removeChild(idleContainer)
        app.stage.addChild(gameContainer);
        flag=1;
        //Pumpkin saga
        var pumpkin = new PIXI.Sprite.fromImage("../assets/Pumpkin.png");
        pumpkin.height = 100;
        pumpkin.width = 100;
        pumpContainer.addChild(pumpkin);
        
}
    else{
       if(flag == 1){
        soundPlay.stop();
        sound.play();
        gameState = 0;
        this.texture = buttonIdeal;
        gameloader.destroy(true,true);
        app.stage.removeChild(gameContainer);
        app.stage.addChild(idleContainer);
        console.log("stop");
        flag = 0
       }
    }
}


 //Mute button
var muteTexture = PIXI.Texture.fromImage('../assets/mute_no.png');
var muteOnTexture = PIXI.Texture.fromImage('../assets/mute.png');
var mutebutton = new PIXI.Sprite(muteTexture);
    mutebutton.buttonMode = true;
    mutebutton.interactive = true;
    mutebutton.x =20;
    mutebutton.y = window.innerHeight-120;
    mutebutton.height = 75;
    mutebutton.width = 75;
    mutebutton.on('click', onmuteButtonDown)
 muteContain.addChild(mutebutton);
var mute =false;
 function onmuteButtonDown(){
     if(mute ==false){
mute = true;
this.texture = muteOnTexture;
sound.stop();
soundPlay.stop();
     }
     else{
         mute = false
         this.texture = muteTexture;
         if(gameState==1){
             soundPlay.play()
         }
         else{
         sound.play();
         }
     }
 }

 app.stage.addChild(buttoncontainer)
app.stage.addChild(muteContain);
function idler(){
 Idleloader.add('../assets/data/ideal.json').load(onAssetLoaded)
function onAssetLoaded(){
    // create an array of textures from an image path
    var frames = [];

    for (var i = 1; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('ghost character00' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    var anim = new PIXI.extras.AnimatedSprite(frames);

    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height-200 ;
    anim.anchor.set(0.5);
    anim.height = 550;
    anim.width =900;
    anim.animationSpeed = 0.5;
    anim.play();

    idleContainer.addChild(anim);
    app.stage.addChild(idleContainer);
    score = new PIXI.Text("Score : " + count, style);
                    score.x = window.innerWidth-400;
                    score.y = 70;
                    idleContainer.addChild(score);
 }
}
 function StartGame(){
    let left = keyboard(37),
    right = keyboard(39);
    gameloader.add('../assets/data/attack.json').load(onAttackLoaded)
    function onAttackLoaded(){
        var framesA = [];

        for (var i = 1; i < 30; i++) {
            var val = i < 10 ? '0' + i : i;
    
            // magically works since the spritesheet was loaded with the pixi loader
            framesA.push(PIXI.Texture.fromFrame('ghost character_attack00' + val + '.png'));
        }
    
        // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
        var animA = new PIXI.extras.AnimatedSprite(framesA);
    
        /*
         * An AnimatedSprite inherits all the properties of a PIXI sprite
         * so you can change its position, its anchor, mask it, etc
         */
        animA.x = app.screen.width / 2;
        animA.y = app.screen.height-200 ;
        animA.anchor.set(0.5);
        animA.height = 300;
        animA.width = 250;
        animA.animationSpeed = 0.5;
        animA.play();
        gameContainer.addChild(pumpContainer);
        gameContainer.addChild(animA);
        pumpContainer.x = 500;
    
        // Animate the rotation
          app.ticker.add(function() {
            if(left.isDown && animA.x > 120){
           animA.x -= 15;
            }
            if(right.isDown && animA.x < window.innerWidth-150){
                animA.x += 15;
                 }
                 pumpContainer.y += 4;
                 if (pumpContainer.y >=window.innerHeight-100) {
                    pumpContainer.y = 0;
                    pumpContainer.x = randomIntFromInterval(200,window.innerWidth);
                 }
                if(hitTestRectangle(animA,pumpContainer)){
                    gameContainer.removeChild(score);
                    console.log("hit");
                    gameContainer.removeChild(pumpContainer);
                    count ++;
                    gameContainer.addChild(pumpContainer);
                    pumpContainer.y = 0;
                    pumpContainer.x = randomIntFromInterval(200,window.innerWidth);
                    score = new PIXI.Text("Score : " + count, style);
                    score.x = window.innerWidth-400;
                    score.y = 70;
                    gameContainer.addChild(score);
                }
                
         });
         
         
    }
}
idler()
StartGame()
app.stage.addChild(idleContainer);
//Score

var style = new PIXI.TextStyle({
    fontFamily: 'Luminari',
    fontSize: 60,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#b2f6ff'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});




//Keyboard tracking
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
  //Toggle fullscreen
  
 var fullscreen = new PIXI.Sprite.fromImage("../assets/fullscreen.png");

 fullscreen.buttonMode = true;
 fullscreen.interactive = true;
fullscreen.x = window.innerWidth- 100;
fullscreen.y = window .innerHeight - 70;
fullscreen.height = 55;
fullscreen.width = 55;
     fullscreen.on('click', ()=>{
        if(document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if(document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if(document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if(document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
     })
     app.stage.addChild(fullscreen);

     window.onresize = function(){
        app.renderer.resize(window.innerWidth, window.innerHeight);
     }
     function randomIntFromInterval(min,max)
     {
         return Math.floor(Math.random()*(max-min+1)+min);
     }

    //Collision Detection
    function hitTestRectangle(r1, r2) {

        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
      
        //hit will determine whether there's a collision
        hit = false;
      
        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;
      
        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
      
        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
      
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
      
          //A collision might be occuring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {
      
            //There's definitely a collision happening
            hit = true;
          } else {
      
            //There's no collision on the y axis
            hit = false;
          }
        } else {
      
          //There's no collision on the x axis
          hit = false;
        }
      
        //`hit` will be either `true` or `false`
        return hit;
      };
  
