import {
    AnimConfig,
    State,
} from "./index";

const PRIORITY: number = 10;

export class ShootingState extends State {
    public constructor(scene: Phaser.Scene, stateName: string, animFramerate: number, spriteKey: string) {
        const animConfig: AnimConfig = {
            animName: "shoot",
            spriteKey: spriteKey,
            framesEnd: 8,
            framesPrefix: "adventurer_bow_",
            framesStart: 0,
            framesZeroPad: 2,
            framesSuffix: "",
            framerate: animFramerate,
        }

        super(scene, stateName, PRIORITY, animConfig);
    }
}
