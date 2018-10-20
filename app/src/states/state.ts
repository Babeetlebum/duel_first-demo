type Anim = {frames: AnimationFrameConfig[], name: string};

export type AnimConfig = {
    animName: string,
    spriteKey: string,
    framesEnd: number,
    framesPrefix: string,
    framesStart: number,
    framesZeroPad: number,
    framesSuffix: string,
    framerate: number,
};

export class State {
    public name: string;
    public anim: Anim;
    public scene: Phaser.Scene;
    public priority: number;

    public constructor (scene: Phaser.Scene, name: string, priority: number, animConfig: AnimConfig) {
        this.scene = scene;
        this.name = name;
        this.priority = priority;
        this.anim = {
            name: animConfig.animName,
            frames:  scene.anims.generateFrameNames(
                animConfig.spriteKey, {
                    end: animConfig.framesEnd,
                    prefix: animConfig.framesPrefix,
                    start: animConfig.framesStart,
                    zeroPad: animConfig.framesZeroPad,
                    suffix: animConfig.framesSuffix,
                })
            };

        if (this.anim !== undefined && this.anim !== null) {
            this.loadAnim(animConfig.framerate);
        }
    }

    protected loadAnim(animFramerate: number) {
        this.scene.anims.create({
            frameRate: animFramerate,
            frames: this.anim.frames,
            key: this.anim.name,
            repeat: -1,
        });
    }

    public get Name(): string {
        return this.name;
    }
}
