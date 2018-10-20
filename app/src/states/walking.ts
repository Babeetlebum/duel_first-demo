import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 10;

export class WalkingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "walk",
            spriteKey: spriteKey,
            framesEnd: 3,
            framesPrefix: "adventurer_walk_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
