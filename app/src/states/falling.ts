import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 30;

export class FallingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "fall",
            spriteKey: spriteKey,
            framesEnd: 1,
            framesPrefix: "adventurer_fall_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
