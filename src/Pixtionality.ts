import PIXI from '../pixi.min'

export class pixtionality {
  public  SpriteAnime(AnimeSequenceName : string, context: any) {
          // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame(AnimeSequenceName + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    var anim = new PIXI.extras.AnimatedSprite(frames);

    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    anim.x = context.screen.width / 2;
    anim.y = context.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    }
}