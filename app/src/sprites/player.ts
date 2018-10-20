import {
    Scene,
} from "phaser";

import {
    State,
    StateFactory,
} from "../states/index";

import PlayerJSON from "../../assets/adventurer.json";
import PlayerPNG from "../../assets/adventurer.png";

const KEY: string = "player";
const STARTING_FRAME = "adventurer-idle-01";
const MAX_JUMPING_FRAMES = 35;
const MIN_FALLING_FRAMES = 35;
const X_VELOCITY = 150;
const Y_VELOCITY = 250;
const ANIM_FRAMERATE = 5;
const AVAILABLE_STATES: any = {
    fall: "FallingState",
    idle: "IdlingState",
    jump: "JumpingState",
    land: "LandingState",
    shoot: "ShootingState",
    walk: "WalkingState",
};

export class Player extends Phaser.Physics.Arcade.Sprite {
    public key: string;
    public cursors: Phaser.Input.Keyboard.CursorKeys;
    public jumpingFrame: number = 0;
    public fallingFrame: number = 0;

    public activeStates: State[] = [];
    public states: any = {};

    public static load(scene: Scene) {
        scene.load.atlas(KEY, PlayerPNG, PlayerJSON);
    }

    public constructor(scene: Scene, x: number, y: number, cursors: Phaser.Input.Keyboard.CursorKeys) {
        super(scene, x, y, KEY, STARTING_FRAME);
        this.key = KEY;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.cursors = cursors;
        this.setBounce(0)
            .setCollideWorldBounds(true)
            .setMaxVelocity(500, 500);

        this.setSize(24, 30)
            .setOffset(this.body.offset.x, this.body.offset.y + 3);
        this.loadStates(AVAILABLE_STATES);

        console.log(this.texture);
    }

    public preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.checkCursors();
        this.setStatesFromPhysics();
    }

    protected setStatesFromPhysics() {
        if (this.body.velocity.y > 30) {
            this.setState("fall");
        } else {
            this.removeState("fall");
        }

        if (this.body.velocity.y < -30) {
            this.setState("jump");
        } else {
            this.removeState("fall");
        }

        if (Math.abs(this.body.velocity.x) > 0) {
            this.setState("walk");
        } else {
            this.setState("idle");
        }

        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }

    protected animate() {
        if (this.body.velocity.y > 30) {
            this.playAnim("fall");
            this.fallingFrame++;
        } else {
            if (this.fallingFrame > MIN_FALLING_FRAMES) {
                this.playAnim("land");
            }

            this.fallingFrame = 0;
            if (this.body.velocity.y < -30) {
                this.playAnim("jump");
            } else if (Math.abs(this.body.velocity.x) > 0) {
                this.playAnim("walk");
            } else {
                this.playAnim("idle");
            }
        }

        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
        }
    }

    public playAnim(animName: string) {
        if (
            this.anims.currentAnim === null || (
                !(
                    this.anims.currentAnim.key === "land" &&
                    this.anims.isPlaying
                ) && this.anims.currentAnim.key !== animName
        )) {
            this.anims.play(animName);
        }
    }

    protected checkCursors() {
        if (this.cursors.left !== undefined && this.cursors.left.isDown) {
            this.setVelocityX(-X_VELOCITY);
        } else if (this.cursors.right !== undefined && this.cursors.right.isDown) {
            this.setFlipX(false);
            this.setVelocityX(X_VELOCITY);
        } else {
            this.setVelocityX(0);
        }

        if (
            this.cursors.up !== undefined && this.cursors.up.isDown && (
                this.body.onFloor() ||
                    this.jumpingFrame > 0 &&
                    this.jumpingFrame < MAX_JUMPING_FRAMES &&
                    !this.body.blocked.up
            )) {
                this.jumpingFrame++;
                this.setVelocityY(-Y_VELOCITY);
        } else {
            this.jumpingFrame = 0;
        }

        if (this.cursors.space !== undefined && this.cursors.space.isDown) {
            this.shoot();
        }

        if (this.cursors.down !== undefined && this.cursors.down.isDown) {
            if (!this.body.onFloor()) {
                this.body.velocity.y += 50;
            }
        }
    }

    protected shoot() {
        console.log("shooting");
        this.playAnim("shoot");
    }

    protected loadStates(states: any) {
        Object.keys(states).forEach((stateName) => {
            this.states[stateName] =
                new StateFactory(states[stateName], {
                    scene: this.scene,
                    name: stateName,
                    animFramerate: ANIM_FRAMERATE,
                    spriteKey: this.key,
                }) as State;
            });
    }

    protected setState(stateName: string) {
        this.activeStates.push(this.states[stateName]);
    }

    protected removeState(stateName: string) {
        this.activeStates = this.activeStates.filter((state) => state.name === stateName);
    }
}
