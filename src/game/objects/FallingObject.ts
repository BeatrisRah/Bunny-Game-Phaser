import { Physics, Scene } from "phaser";

export default class FallingObject {
    private readonly maxObjects: number = 10;
    private spawnInterval: number = 1000;
    private lastSpawnTime: number = 0;
    public fallingGroup: Physics.Arcade.Group;
    private scene: Scene;

    constructor(scene:Scene){
        this.scene = scene
        this.create()
    }

    create(){
        this.fallingGroup = this.scene.physics.add.group()
        

    }

    public update(time: number): void{
        if (this.fallingGroup.countActive(true) < this.maxObjects && time > this.lastSpawnTime + this.spawnInterval) {
            this.spawnFallingObject();
            this.lastSpawnTime = time;
        }
    
        
        this.fallingGroup.getChildren().forEach((obj: any) => {
            if (obj.update) obj.update();
        });
    }

    private spawnFallingObject():void{
        const x = Phaser.Math.Between(50, this.scene.scale.width - 50);
        const y = -50;
    
        const type = Math.random() < 0.5 ? 'good' : 'bad';
        const color = type === 'good' ? 0x00ff00 : 0xff0000;
    
        const rect = this.scene.add.rectangle(x, y, 30, 30, color);
        this.fallingGroup.add(rect);
        this.scene.physics.add.existing(rect);
    
        const body = rect.body as Phaser.Physics.Arcade.Body;
        body.setVelocityY(Phaser.Math.Between(100, 200));
        body.setAllowGravity(false);
        
        rect.update = () => {
            
            if (rect.y > this.scene.scale.height) {
                rect.destroy(); 
            }
        };
    }
}