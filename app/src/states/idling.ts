import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 10;

export class IdlingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "idle",
            spriteKey: spriteKey,
            framesEnd: 3,
            framesPrefix: "adventurer_idle_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
