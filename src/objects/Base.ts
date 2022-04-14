import type { IBase, BasePayload } from '../../types/Base';
import Vector from '../utils/Vector';

interface Base extends IBase { };

class Base {
    constructor({ x, y, mass, elasticity, friction, damageOnCollision, acceleration }: BasePayload) {
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.mass = mass ?? 5;
        this.inverseMass = (mass <= 0) ? 0 : (1 / mass);
        this.elasticity = elasticity ?? 1;
        this.friction = friction ?? 0.05;
        this.damageOnCollision = damageOnCollision ?? false;
        this.unitAcceleration = acceleration ?? 1;
    }
}


export default Base;