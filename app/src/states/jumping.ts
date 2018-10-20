import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 30;

export class JumpingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "jump",
            spriteKey: spriteKey,
            framesEnd: 3,
            framesPrefix: "adventurer_jump_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
