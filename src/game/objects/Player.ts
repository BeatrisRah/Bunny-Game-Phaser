import { Scene, GameObjects, Input, Physics } from 'phaser';


export default class PLayer {
    public player!: GameObjects.Rectangle;
    private readonly PLAYER_WIDTH = 50;
    private readonly PLAYER_HEIGHT = 150;
    public playerBody!: Physics.Arcade.Body;
    public facingRight: boolean = true;

    private keys!: {left:Input.Keyboard.Key, rigth:Input.Keyboard.Key}
    private acceleration: number = 450;
    private readonly deceleration: number = 500;
    private maxSpeed: number = 350;
    private playerSpeed: number = 100;



    constructor(private scene: Scene) {
        this.create()

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
        // const isMoving = this.keys.left.isDown || this.keys.rigth.isDown

        // if (isMoving) {
        //     this.playerSpeed = Math.min(this.playerSpeed + this.acceleration * (delta / 1000), this.maxSpeed);
        // } else {
        //     this.playerSpeed = 100;
        // }

        // if (this.keys.left.isDown) {
        //     this.playerBody.setVelocityX(-this.playerSpeed);
        //     this.facingRight = false;
        // } else if (this.keys.rigth.isDown) {
        //     this.playerBody.setVelocityX(this.playerSpeed);
        //     this.facingRight = true;
        // }
        let velocityX = this.playerBody.velocity.x;

        if (this.keys.left.isDown) {
            this.facingRight = false;
    
            velocityX -= this.acceleration * (delta / 1000);
            if (velocityX < -this.maxSpeed) velocityX = -this.maxSpeed;
        } else if (this.keys.rigth.isDown) {
            this.facingRight = true;
    
            velocityX += this.acceleration * (delta / 1000);
            if (velocityX > this.maxSpeed) velocityX = this.maxSpeed;
        } else {
            // Apply deceleration toward zero
            if (Math.abs(velocityX) < 10) {
                velocityX = 0;
            } else {
                velocityX += (velocityX > 0 ? -1 : 1) * this.deceleration * (delta / 1000);
            }
        }
    
        this.playerBody.setVelocityX(velocityX);

    }


}