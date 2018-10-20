import {
    FallingState,
    IdlingState,
    JumpingState,
    LandingState,
    ShootingState,
    WalkingState,
} from "../states/index";

type StateConfig = {scene: Phaser.Scene, name: string, animFramerate: number, spriteKey: string};

const STATES_STORE: any = {
    FallingState,
    IdlingState,
    JumpingState,
    LandingState,
    ShootingState,
    WalkingState,
};

export class StateFactory {
    public constructor(stateName: string, stateConfig: StateConfig) {
        if (STATES_STORE[stateName] !== undefined) {
            return new STATES_STORE[stateName](
                stateConfig.scene,
                stateConfig.name,
                stateConfig.animFramerate,
                stateConfig.spriteKey);
        }
        throw new Error(`State ${stateName} doesn't exist`);
    }
}
