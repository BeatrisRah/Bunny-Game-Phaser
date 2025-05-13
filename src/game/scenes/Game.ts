import { Scene} from 'phaser';
import PLayer from '../objects/Player';

export class Game extends Scene
{

    background: Phaser.GameObjects.Image;
    private player!: PLayer;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'forest-bg')
        this.player = new PLayer(this)

    }

    update(time:number, delta: number): void {
        this.player.update(delta)
    }
}
