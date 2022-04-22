import Base from "../src/objects/Base";
import type { BasePayload } from "./Base";


interface BallPayload extends BasePayload {
    radius?: number;
    color?: string;
}


interface Ball extends Base {
    radius: number;
    color: string;
}


export type { Ball as IBall, BallPayload };