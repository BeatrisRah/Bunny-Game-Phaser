import { Scene, GameObjects, Input, Physics } from 'phaser';

export class Game extends Scene
{
    private player!: GameObjects.Rectangle;
    private readonly PLAYER_WIDTH = 50;
    private readonly PLAYER_HEIGHT = 150;
    private playerBody!: Physics.Arcade.Body;

    private keyRigth!: Input.Keyboard.Key;
    private keyLeft!: Input.Keyboard.Key;
    private accelerationRate: number = 50; // Rate of acceleration
    private maxSpeed: number = 250; // Maximum speed
    private currentSpeed: number = 0; // Current speed



    background: Phaser.GameObjects.Image;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'forest-bg')
        this.player = this.add.rectangle(512, this.scale.height - this.PLAYER_HEIGHT, this.PLAYER_WIDTH, this.PLAYER_HEIGHT, 0x00ff00).setOrigin(0, 0)
        
        this.physics.add.existing(this.player)
        
        this.playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        this.playerBody.setCollideWorldBounds(true);
        this.keyRigth = this.input.keyboard?.addKey('D')!;
        this.keyLeft = this.input.keyboard?.addKey('A')!;


    }

    update(delta: number): void {
        this.playerBody.setVelocity(0);
        if(this.keyRigth.isDown){
            this.currentSpeed = Math.min(this.currentSpeed + this.accelerationRate * (delta / 1000), this.maxSpeed);
            this.playerBody.setVelocityX(this.currentSpeed);
        } else if(this.keyLeft.isDown){
            this.playerBody.setVelocityX(-200)
        }
    }
}
