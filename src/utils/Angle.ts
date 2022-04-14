class Angle {

    /**
     * Returns the angle in radians
     */
    static toRadians(angle: number) {
        return (angle * Math.PI) / 180;
    }

    /**
     * Returns the angle in degrees
     */
    static toDegree(angle: number) {
        return (angle * 180) / Math.PI;
    }

    /**
     * Returns the cartesian coordinates of the corresponding point on the circle's circumference from origin
     */
    static toCaretesian(x: number, y: number, radius: number, angle: number) {
        return { x: x + radius * Math.cos(angle), y: y + radius * Math.sin(angle) };
    }
}

export default Angle;