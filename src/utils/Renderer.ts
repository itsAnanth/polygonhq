import Base from "../objects/Base";

class Renderer {

    static renderPlayer(canvas: HTMLCanvasElement, callback: (x: number, y: number) => any) {
        const dx = canvas.width / 2, dy = canvas.height / 2;
        callback(dx, dy);
    }


    static renderEnemies(canvas: HTMLCanvasElement, me: Base, p: Base, callback: (x: number, y: number) => any) {
        const relativeX = p.position.x - me.position.x;
        const relativeY = p.position.y - me.position.y;

        // if (
        //     relativeX > canvas.height ||
        //     relativeX < -canvas.height ||
        //     relativeY > canvas.width ||
        //     relativeY < -canvas.width
        // ) return;

        callback(relativeX + canvas.width / 2, relativeY + canvas.height / 2);
    }


    static renderWorld(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, p: Base, options: { fillStyle?: string, strokeStyle?: string, mapX?: number, mapY?: number, tileWidth?: number, tileHeight?: number } = { }) {
        const MAP_SIZE = 3000;
        ctx.fillStyle = "#323232";
        ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
        ctx.lineWidth = 3;
        ctx.save();



        const dx = p.position.x - canvas.width / 2;
        const dy = p.position.y - canvas.height / 2;
        ctx.fillStyle = options.fillStyle ?? "#121212";
        ctx.strokeStyle = options.strokeStyle ?? "#635f5f";
        const sizeX = (options.mapX ?? MAP_SIZE) / (options.tileWidth ?? 30);
        const sizeY = (options.mapY ?? MAP_SIZE) / (options.tileHeight ?? 30);

        for (let x = 0; x < (options.mapX ?? MAP_SIZE); x += sizeX) {
            for (let y = 0; y < (options.mapY ?? MAP_SIZE); y += sizeY) {
                ctx.strokeRect(-dx + x, -dy + y, sizeX, sizeY);
            }
        }

        Renderer.renderBorder(ctx, canvas, p);

        ctx.restore();
    }

    static renderBorder(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, p: Base) {
        const PLAYER_RADIUS = 1;
        const MAP_SIZE = 3000;
        const dx = p.position.x - canvas.width / 2;
        const dy = p.position.y - canvas.height / 2;
        ctx.strokeStyle = "#010101";
        ctx.strokeRect(
            -dx - PLAYER_RADIUS,
            -dy - PLAYER_RADIUS,
            MAP_SIZE + (PLAYER_RADIUS * 4) / 2,
            MAP_SIZE + (PLAYER_RADIUS * 4) / 2
        );
    }
}

export default Renderer;