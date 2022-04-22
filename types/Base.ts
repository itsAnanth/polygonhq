import Vector from "../src/utils/Vector";

type BasePayload = {
    x: number;
    y: number;
    mass?: number;
    elasticity?: number;
    friction?: number;
    damageOnCollision?: boolean;
    acceleration?: number;
    enableControls?: boolean;
}

interface Base {
    position: Vector;
    mass: number;
    previous: Vector;
    acceleration: Vector;
    velocity: Vector;
    elasticity: number;
    friction: number;
    damageOnCollision: boolean;
    unitAcceleration: number;
    inverseMass: number;
    controlsEnabled: boolean;
}


export type { Base as IBase, BasePayload };