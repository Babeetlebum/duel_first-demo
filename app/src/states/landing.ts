import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 10;

export class LandingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "land",
            spriteKey: spriteKey,
            framesEnd: 1,
            framesPrefix: "adventurer_crouch_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
