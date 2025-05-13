import { Scene, GameObjects } from 'phaser';

export class Game extends Scene
{
    private player!: GameObjects.Rectangle;
    private readonly PLAYER_WIDTH = 50;
    private readonly PLAYER_HEIGHT = 150;

    background: Phaser.GameObjects.Image;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'forest-bg')
        this.player = this.add.rectangle(512, this.scale.height - this.PLAYER_HEIGHT, this.PLAYER_WIDTH, this.PLAYER_HEIGHT, 0x00ff00).setOrigin(0, 0)
    }
}
