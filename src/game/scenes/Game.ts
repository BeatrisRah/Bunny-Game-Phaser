import { Scene} from 'phaser';
import PLayer from '../objects/Player';
import Basket from '../objects/Basket';
import FallingObject from '../objects/FallingObject';


export class Game extends Scene
{

    background: Phaser.GameObjects.Image;
    private player!: PLayer;
    private basket: Basket
    private fallingGroup: FallingObject
    private pauseKey!: Phaser.Input.Keyboard.Key
    private isPaused: boolean;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'forest-bg')
        this.player = new PLayer(this)
        this.basket = new Basket(this, this.player)
        this.fallingGroup= new FallingObject(this)

        this.pauseKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.isPaused = false;

        this.physics.add.overlap(
            this.basket.basket as Phaser.Types.Physics.Arcade.GameObjectWithBody,                
            this.fallingGroup.fallingGroup,   
            this.handleBasketCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this                              
        );
    }

    update(time:number, delta: number): void {
        if(Phaser.Input.Keyboard.JustDown(this.pauseKey)){
            this.isPaused = !this.isPaused

            if(this.isPaused){
                this.physics.world.pause()
                return;
            } else {
                this.physics.world.resume()
            }
        }

        this.player.update(delta)
        this.basket.update()
        this.fallingGroup.update(time);

    }

    handleBasketCollision(
        basketObj: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body },
        fallingObj: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }){
        const rect = fallingObj as Phaser.GameObjects.Rectangle;
        
        const color = rect.fillColor;

        if (color === 0x00ff00) {
            console.log('✅ Caught GOOD object!');
        } else {
            console.log('❌ Caught BAD object!');
        }
    
        rect.destroy();
    }
}
