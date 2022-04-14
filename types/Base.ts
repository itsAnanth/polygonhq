import Vector from "../src/utils/Vector";

type BasePayload = {
    x: number;
    y: number;
    mass?: number;
    elasticity?: number;
    friction?: number;
    damageOnCollision?: boolean;
    acceleration?: number;
}

interface Base {
    position: Vector;
    mass: number;
    acceleration: Vector;
    velocity: Vector;
    elasticity: number;
    friction: number;
    damageOnCollision: boolean;
    unitAcceleration: number;
    inverseMass: number;
}


export type { Base as IBase, BasePayload };