import type { IAF } from '../../types/AnimationFrame';

interface AnimationFrame extends IAF { };

class AnimationFrame {
    constructor(fps = 60, callback: (delta: number) => any|Promise<any>) {
        this.requestId = 0;
        this.fps = fps;
        this.callback = callback;
    }

    start() {
        let then = performance.now();
        const interval = 1000 / this.fps;
        const tolerance = 0.1;

        const animateLoop = (now: number) => {
            this.requestId = requestAnimationFrame(animateLoop);
            const delta = now - then;

            if (delta >= interval - tolerance) {
                then = now - (delta % interval);
                this.callback(delta);
            }
        };
        this.requestId = requestAnimationFrame(animateLoop);
    }

    stop() {
        cancelAnimationFrame(this.requestId);
    }

    /**
     * 
     * @deprecated
     */
    limitLoop(fn: any, fps: any) {

        // Use var then = Date.now(); if you
        // don't care about targetting < IE9
        let then = Date.now();
    
        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        let interval = 1000 / fps;
    
        // @ts-ignore
        return (function loop(time) {
            requestAnimationFrame(loop);
    
            // again, Date.now() if it's available
            var now = new Date().getTime();
            var delta = now - then;
    
            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just 
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);
    
                // call the fn
                fn();
            }
        }(0));
    };
}

export default AnimationFrame;