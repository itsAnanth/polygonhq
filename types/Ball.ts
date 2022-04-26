import Base from "../src/objects/Base";
import ObjectTypes from "../src/utils/objectTypes";
import type { BasePayload } from "./Base";


interface BallPayload extends BasePayload {
    radius?: number;
    color?: string;
}


interface Ball extends Base {
    type: ObjectTypes.BALL;
    radius: number;
    color: string;
}


export type { Ball as IBall, BallPayload };