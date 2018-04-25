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
var gameState = 0; 
//Bhoot awaz
const sound =  PIXI.sound.Sound.from({url :'../assets/hauntedhouse.wav', loop:true});
sound.play();

//Anime holders
const idleContainer = new PIXI.Container();
const muteContain = new PIXI.Container();
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
        gameState = 1;
        this.texture =  buttonDown;
        console.log("start");
        Idleloader.destroy();
        app.stage.removeChild(idleContainer)
        StartGame();
        flag=1;
}
    else{
       if(flag == 1){
        gameState = 0;
        this.texture = buttonIdeal;
        flag = 0
        app.stage.removeChild(gameContainer);
        gameloader.destroy();
        console.log("stop");
        idler();
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
     }
     else{
         mute = false
         this.texture = muteTexture;
         sound.play();
     }
 }
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
    anim.animationSpeed = 0.5;
    anim.play();

    idleContainer.addChild(anim);

    // Animate the rotation
    //  app.ticker.add(function() {
    //     anim.rotation += 0.01;
    // });
    app.stage.addChild(buttoncontainer)
    app.stage.addChild(muteContain);
    app.stage.addChild(idleContainer);
 }
}
 function StartGame(){
    idleContainer.destroy({children:true, texture:true, baseTexture:true})
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
        animA.animationSpeed = 0.5;
        animA.play();
    
        gameContainer.addChild(animA);
    
        // Animate the rotation
          app.ticker.add(function() {
       
           animA.x += 1;
            
            
         });
         app.stage.addChild(gameContainer);
    }
}
idler();
