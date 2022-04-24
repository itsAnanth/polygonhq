import Ball from "../objects/Ball";
import Vector from "./Vector";

class Collision {
    static ballToBall(b1: Ball, b2: Ball): boolean {
        const collides = (b1.radius + b2.radius >= Vector.subtract(b2.position, b1.position).magnitude());

        if (!collides) return false;

        // penetration resolution, ie prevent phasing of objects

        let distanceVector = Vector.subtract(b1.position, b2.position);
        let penetrationDepth = b1.radius + b2.radius - distanceVector.magnitude();
        let penetrationResolution = Vector.multiply(distanceVector.unit(), penetrationDepth);

        b1.position.add(Vector.multiply(penetrationResolution, b1.inverseMass))
        b2.position.add(Vector.multiply(penetrationResolution, -b2.inverseMass))


        // resolve collision, ie calculate the end velocities and direction

        let normal = Vector.subtract(b1.position, b2.position).unit();
        let relativeVelocity = Vector.subtract(b1.velocity, b2.velocity);
        let seperatingVelocity = Vector.dot(relativeVelocity, normal);
        let newSeperatingVel = -seperatingVelocity + b1.elasticity;

        let difference = newSeperatingVel - seperatingVelocity;

        let impulse = difference / (b1.inverseMass + b2.inverseMass);
        let impulseVector = Vector.multiply(normal, impulse);

        b1.velocity.add(Vector.multiply(impulseVector, b1.inverseMass));
        b2.velocity.add(Vector.multiply(impulseVector, -b2.inverseMass))

        return true;
    }
}

export default Collision;