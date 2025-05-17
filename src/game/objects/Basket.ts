import { Scene, GameObjects, Physics } from "phaser";
import PLayer from "./Player";

export default class Basket {
    private scene: Scene;
    private player: PLayer;
    private offsetX: number;
    private offsetY: number;

    private readonly BASKET_WIDTH: number = 50;
    private readonly BASKET_HEIGHT: number = 80;
    private basket: GameObjects.Rectangle;
    private basketBody: Physics.Arcade.Body;
    
    constructor(scene: Scene, player:PLayer, offsetX: number = 20, offsetY:number = 0 ){
        this.scene = scene;
        this.player = player;
        this.offsetX = this.player.player.width;
        this.offsetY = this.player.player.height - this.BASKET_HEIGHT;

        this.create()
    }

    create(){
        this.basket = this.scene.add.rectangle(
            this.player.player.x + this.offsetX, 
            this.player.player.y + this.offsetY, 
            this.BASKET_WIDTH, 
            this.BASKET_HEIGHT, 
            0xff0000).setOrigin(0, 0)
        this.scene.physics.add.existing(this.basket)
        this.basketBody = this.basket.body as Physics.Arcade.Body;
        this.basketBody.setCollideWorldBounds(true);
        this.basketBody.setAllowGravity(false);
    }

    update(){
        this.basketBody.setVelocity(0)
        this.basketBody.reset(
            this.player.playerBody.x  + this.offsetX,
            this.player.playerBody.y + this.offsetY
        )
    }
}