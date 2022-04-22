import type { IBase, BasePayload } from '../../types/Base';
import Controller from '../utils/Controller';
import Vector from '../utils/Vector';

interface Base extends IBase { };

class Base {
    constructor({ x, y, mass, elasticity, friction, damageOnCollision, acceleration, enableControls }: BasePayload) {
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.previous = new Vector();
        this.acceleration = new Vector();
        this.mass = mass ?? 5;
        this.inverseMass = (mass <= 0) ? 0 : (1 / mass);
        this.elasticity = elasticity ?? 1;
        this.friction = friction ?? 0.05;
        this.damageOnCollision = damageOnCollision ?? false;
        this.unitAcceleration = acceleration ?? 1;
        this.controlsEnabled = enableControls ?? false;
    }

    moveTo(vector: Vector) {
        this.velocity = Vector.subtract(vector, this.position).unit().multiply(this.unitAcceleration);
    }

    force(x: Vector | number, y?: number) {
        let dv = x instanceof Vector ? x : new Vector(x, y);

        this.velocity.add(dv);
        this.position.add(this.velocity);

        this.velocity = new Vector();
    }


    verlet(delta: number) {
        let nextX = this.position.x + (this.position.x - this.previous.x) * this.friction + this.velocity.x * delta ** 2;
        let nextY = this.position.y + (this.position.y - this.previous.y) * this.friction + this.velocity.y * delta ** 2;

        this.previous = this.position;

        this.position.x = nextX;
        this.position.y = nextY;
    }

    update() {
        this.acceleration = this.acceleration.multiply(this.unitAcceleration);
        this.velocity.add(this.acceleration);
        this.velocity.multiply(1 - this.friction);
        this.position.add(this.velocity);
    }

    registerControls() {
        if (!this.controlsEnabled) return;

        let { LEFT, UP, DOWN, RIGHT } = Controller;

        if (LEFT) {
            this.acceleration.x = -this.unitAcceleration;
        }
        if (UP) {
            this.acceleration.y = -this.unitAcceleration;
        }
        if (RIGHT) {
            this.acceleration.x = this.unitAcceleration;
        }
        if (DOWN) {
            this.acceleration.y = this.unitAcceleration;
        }
        if (!LEFT && !RIGHT) {
            this.acceleration.x = 0;
        }
        if (!UP && !DOWN) {
            this.acceleration.y = 0;
        }
    }
}


export default Base;