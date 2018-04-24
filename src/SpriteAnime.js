var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    maxFrame = 5,
    af = 0,
    df = 4; // images per seconds

    var renderer = autoDetectRenderer(256, 256);

    document.body.appendChild(renderer.view);

    var stage = new Container();

    renderer.render(stage);

    renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
//mario //s3.amazonaws.com/media-p.slid.es/uploads/55786/images/1828075/mario-jump.png
loader.add("megaman", "../assets/compileBird.png")
.add("bg", )
.load(setup);

var megaman;
var run = [];
var megamanTexture;

function setup() {
  megamanTexture = loader.resources["megaman"].texture;
  run.push (new PIXI.Rectangle(0,0,160,160),
              new PIXI.Rectangle(170,0,160,160),
              new PIXI.Rectangle(330,0,160,160),
              new PIXI.Rectangle(490,0,90,160),
              new PIXI.Rectangle(630,0,90,160)
        );
  megamanTexture.frame = run[0];
  megaman = new Sprite(megamanTexture);
  megaman.x=window.innerWidth/2;
  megaman.y=window.innerHeight/2;
  stage.addChild(megaman);
  renderer.render(stage);
}
function gameLoop() {
  var f = requestAnimationFrame(gameLoop);
  if (af >= maxFrame)
  {
    af = 0;
  } else {
    af += 0.2/df;
  }
  megamanTexture.frame = run[Math.floor(af)];
  stage.removeChild(megaman);
  megaman = new Sprite(megamanTexture);
  megaman.x=window.innerWidth/2;
  megaman.y=window.innerHeight/2;
  stage.addChild(megaman);
  renderer.render(stage);
}



//Start the game loop
gameLoop();
