var app = new PIXI.Application(window.innerWidth,window.innerHeight);
app.view.style.position = "absolute";
app.view.style.display = "block";
document.body.appendChild(app.view)

var bg = new PIXI.Sprite.fromImage("../assets/BG.png");
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);

var idleContainer = new PIXI.Container();
var buttoncontainer = new PIXI.Container();
var button = 
PIXI.loader.add('../assets/data/ideal.json').load(onAssetLoaded)

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
app.stage.addChild(idleContainer);
 }

