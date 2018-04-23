let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)
    let app = new PIXI.Application(900,900);
    document.body.appendChild(app.view)

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    const BIRD_FRAME_LIST = [
        '../assets/PNG/Frame-1.png',
        '../assets/PNG/Frame-2.png',
        '../assets/PNG/Frame-3.png',
        '../assets/PNG/Frame-4.png'
      ];
     
   PIXI.loader
   .add("../assets/PNG/Frame-1.png")
   .load(setup);

   function setup () {
    let byrd = new PIXI.Sprite(
        PIXI.loader.resources["../assets/PNG/Frame-1.png"].texture);
        app.stage.addChild(byrd);
        byrd.x = 30;
        byrd.y = 30;
}
   
   

   