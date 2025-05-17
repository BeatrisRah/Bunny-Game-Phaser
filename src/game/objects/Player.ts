import { Scene, GameObjects, Input, Physics } from 'phaser';
import Basket from '../objects/Basket';


export default class PLayer {
    public player!: GameObjects.Rectangle;
    private readonly PLAYER_WIDTH = 50;
    private readonly PLAYER_HEIGHT = 150;
    public playerBody!: Physics.Arcade.Body;

    private keys!: {left:Input.Keyboard.Key, rigth:Input.Keyboard.Key}
    private acceleration: number = 100;
    private maxSpeed: number = 350;
    private playerSpeed: number = 100;

    private basket: Basket


    constructor(private scene: Scene) {
        this.create()
        this.basket = new Basket(this.scene, this)

    }

    private create() {
        this.player = this.scene.add.rectangle(512, 
            this.scene.scale.height - this.PLAYER_HEIGHT, 
            this.PLAYER_WIDTH, this.PLAYER_HEIGHT, 
            0x00ff00).setOrigin(0, 0);

        this.scene.physics.add.existing(this.player);
        this.playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        this.playerBody.setCollideWorldBounds(true);

        this.keys = this.scene.input.keyboard?.addKeys({
            left:'A',
            rigth:'D'
        }) as {left:Input.Keyboard.Key, rigth:Input.Keyboard.Key}
        

    }


    public update(delta: number) {
        this.playerBody.setVelocity(0)

        const isMoving = this.keys.left.isDown || this.keys.rigth.isDown

        if (isMoving) {
            this.playerSpeed = Math.min(this.playerSpeed + this.acceleration * (delta / 1000), this.maxSpeed);
        } else {
            this.playerSpeed = 100;
        }

        if (this.keys.left.isDown) {
            this.playerBody.setVelocityX(-this.playerSpeed);
        } else if (this.keys.rigth.isDown) {
            this.playerBody.setVelocityX(this.playerSpeed);
        }

        this.basket.update()


    }


}