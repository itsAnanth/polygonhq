import Base from "./Base";
import type { IBall, BallPayload } from '../../types/Ball';
import Angle from "../utils/Angle";
import Vector from "../utils/Vector";
import ObjectTypes from "../utils/objectTypes";


interface Ball extends IBall { };

class Ball extends Base {
    constructor(payload: BallPayload) {
        super(payload);
        const { radius, color } = payload;
        this.radius = radius ?? 5;
        this.color = color ?? 'red';
        this.type = ObjectTypes.BALL;
    }

    render(ctx: CanvasRenderingContext2D, options: { strokeStyle?: string, x?: number, y?: number } = {}) {
        ctx.beginPath();
        ctx.arc(options.x ?? this.position.x, options.y ?? this.position.y, this.radius, 0, Angle.toRadians(360));
        ctx.strokeStyle = options.strokeStyle ?? this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    /**
     * Checks collision between two ball entities
     */
    static collision(b1: Ball, b2: Ball) {
        return (b1.radius + b2.radius >= Vector.subtract(b2.position, b1.position).magnitude());
    }

    static penetration_resolution(b1: Ball, b2: Ball) {
        let dist = Vector.subtract(b1.position, b2.position);
        let pen_depth = b1.radius + b2.radius - dist.magnitude();
        let pen_res = Vector.multiply(dist.unit(), pen_depth / (b1.inverseMass + b2.inverseMass));
        b1.position.add(Vector.multiply(pen_res, b1.inverseMass));
        b2.position.add(Vector.multiply(pen_res, -b2.inverseMass));
    }

    /**
     * principle -> law of conservation of momentum & kinetic energy
     * total moment before = total momentum after
     * m(a)v(a) + m(b)v(b) = m(a)v(a)' + m(b)v(b)'
     * 
     * total kinetic energey before = total kinetic energy after
     * KE = m(v^2) / 2
     * 
     * if sum of ke remains same after collision its called elastic collision
     */
    static collision_resoluion(b1: Ball, b2: Ball) {
        //collision normal vector
        let normal = Vector.subtract(b1.position, b2.position).unit();
        //relative velocity vector
        let relVel = Vector.subtract(b1.velocity, b2.velocity);
        //separating velocity - relVel projected onto the collision normal vector
        let sepVel = Vector.dot(relVel, normal);
        //the projection value after the collision (multiplied by -1)
        let new_sepVel = -sepVel * b1.elasticity;

        let sepVelDiff = new_sepVel - sepVel;
        let impulse = sepVelDiff / (b1.inverseMass + b2.inverseMass);
        let impulseVec = Vector.multiply(normal, impulse);
        // //collision normal vector with the magnitude of the new_sepVel
        // let sepVelVec = normal.multiply(new_sepVel);

        //adding the impulse vector to the original vel. vector
        b1.velocity.add(Vector.multiply(impulseVec, b1.inverseMass));
        //adding its opposite to the other balls original vel. vector
        b2.velocity.add(Vector.multiply(impulseVec, -b2.inverseMass));
    }

}

export default Ball;