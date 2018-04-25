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
    // PIXI.sound.Sound.from({url: '../assets/hauntedhouse.mp3',preload: true,loaded: function(err, sound) {sound.play(); }});
    const sound = PIXI.sound.Sound.from('../assets/hauntedhouse.mp3');
sound.play();
   
   

   