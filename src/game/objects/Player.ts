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
        let velocityX = this.playerBody.velocity.x;
        
        const basket_width = 70;
        const basketOffsetX = this.facingRight ? this.player.width + basket_width : 0;
        const sceneWidth = this.scene.scale.width;
        const playerRightEdge = this.playerBody.x + this.PLAYER_WIDTH;
        const playerLeftEdge = this.playerBody.x;

        if (this.keys.left.isDown) {
            this.facingRight = false;
    
            if (playerLeftEdge - basket_width > 0) {
                velocityX -= this.acceleration * (delta / 1000);
                velocityX = Math.max(velocityX, -this.maxSpeed);
            } else {
                velocityX = 0;
            }
        } else if (this.keys.rigth.isDown) {
            this.facingRight = true;
    
            if (playerRightEdge + basket_width < sceneWidth) {
                velocityX += this.acceleration * (delta / 1000);
                velocityX = Math.min(velocityX, this.maxSpeed);
            } else {
                velocityX = 0;
            }
        } else {

            if(playerLeftEdge - basket_width <= 0 || playerRightEdge + basket_width >= sceneWidth){
                this.playerBody.setVelocityX(0);
                return;
            }

            if (Math.abs(velocityX) < 10) {
                velocityX = 0;
            } else {
                velocityX += (velocityX > 0 ? -1 : 1) * this.deceleration * (delta / 1000);
            }
        }
    
        this.playerBody.setVelocityX(velocityX);

    }


}