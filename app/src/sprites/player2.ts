import {
    Scene,
} from "phaser";

import PlayerJSON from "../../assets/arcade_character_tiles.json";
import PlayerPNG from "../../assets/arcade_character_tiles.png";

const KEY: string = "player";

export class Player extends Phaser.Physics.Arcade.Sprite {
    protected cursors: Phaser.Input.Keyboard.CursorKeys;

    public static load(scene: Scene) {
        scene.load.atlas(KEY, PlayerPNG, PlayerJSON);
    }

    public constructor(scene: Scene, x: number, y: number, cursors: Phaser.Input.Keyboard.CursorKeys) {
        super(scene, x, y, KEY);
        this.cursors = cursors;
    }

    public init() {
        this.setBounce(0.2)
            .setCollideWorldBounds(true);

        this.setSize(66, 66);
        this.createAnimations();

        return this;
    }

    public preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.checkCursors();
    }

    public checkCursors() {
        if (this.cursors.left !== undefined && this.cursors.left.isDown) {
            this.scene.anims.play("walk", this);
            this.setFlipX(true);
            this.setVelocityX(-200);
        } else if (this.cursors.right !== undefined && this.cursors.right.isDown) {
            this.scene.anims.play("walk", this);
            this.setFlipX(false);
            this.setVelocityX(200);
        // } else {
        //     console.log(this);
        //     debugger;
        //     this.scene.anims.play("idle", this);
        //     this.setVelocityX(0);
        }

        if (this.cursors.up !== undefined && this.cursors.up.isDown && this.body.onFloor()) {
            this.setVelocityY(-500);
        }
    }

    protected createAnimations() {
        const animations = [
            {
                name: "walk",
                frames:  this.scene.anims.generateFrameNames(
                    "player", {
                        end: 2,
                        prefix: "platformChar_walk",
                        start: 1,
                        suffix: ".png",
                    })
            },
            {
                name: "idle",
                frames:  this.scene.anims.generateFrameNames("player", {
                    frames: ["platformChar_idle.png"],
                }),
            },
        ];

        animations.forEach((anim) => {
            this.scene.anims.create({
                frameRate: 10,
                frames: anim.frames,
                key: anim.name,
                repeat: -1,
            });
        });
    }
}
