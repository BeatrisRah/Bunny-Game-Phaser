import { Scene, GameObjects, Input, Physics } from 'phaser';


export default class PLayer {
    private player!: GameObjects.Rectangle;
    private readonly PLAYER_WIDTH = 50;
    private readonly PLAYER_HEIGHT = 150;
    private playerBody!: Physics.Arcade.Body;

    private keyRigth!: Input.Keyboard.Key;
    private keyLeft!: Input.Keyboard.Key;
    private accelerationRate: number = 50;
    private maxSpeed: number = 250;
    private currentSpeed: number = 0;

    constructor(private scene: Scene, private keyboard: Input.Keyboard.KeyboardPlugin) {
        this.create()
    }

    private create() {
        this.player = this.scene.add.rectangle(512, this.scene.scale.height - this.PLAYER_HEIGHT, this.PLAYER_WIDTH, this.PLAYER_HEIGHT, 0x00ff00).setOrigin(0, 0);
        
        this.scene.physics.add.existing(this.player);
        this.playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        this.playerBody.setCollideWorldBounds(true);

        this.keyRigth = this.keyboard?.addKey('D')
        this.keyLeft = this.keyboard?.addKey('A')!;
    
    }


    public update(delta: number) {
        this.playerBody.setVelocity(0);
        if(this.keyRigth.isDown){
            this.currentSpeed = Math.min(this.currentSpeed + this.accelerationRate * (delta / 1000), this.maxSpeed);
            this.playerBody.setVelocityX(this.currentSpeed);
        } else if(this.keyLeft.isDown){
            this.playerBody.setVelocityX(-200)
        }
    
    }


}