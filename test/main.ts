import Ball from "../src/objects/Ball";
import AnimationFrame from "../src/utils/AnimationFrame";
import Collision from "../src/utils/Collision";
import Controller from "../src/utils/Controller";
import Renderer from "../src/utils/Renderer";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('keydown', Controller.handleKeys);
window.addEventListener('keyup', Controller.handleKeys);

const ball = new Ball({
    x: 300,
    y: 300,
    enableControls: true,
    acceleration: 0.5
});

const ball2 = new Ball({
    x: 500,
    y: 300,
    radius: 10,
    mass: 10,
    enableControls: false,
    acceleration: 0.5
});

const entities = [ball, ball2];
const others = [ball2];


(new AnimationFrame(60, gameloop)).start()

function gameloop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    Renderer.renderWorldTiles(ctx, canvas, ball);
    ball.registerControls();

    entities.forEach((entity, index) => {
        Renderer.renderEnemies(canvas, ball, entity, (x, y) => {
            entity.render(ctx, {
                x: x,
                y: y
            })
        })

        for (let i = index + 1; i < entities.length; i++) {

            const entity_1 = entities[index], entity_2 = entities[i];
            // if (entity_2.id == entity_1.id || (entity_1.type == 'bullet' && entity_2.type == 'bullet')) continue;
            // if (ballTags.includes(entity_1.type) && ballTags.includes(entity_2.type) && Ball.collision(entity_1, entity_2)) {
            //     const [player, bullet] = entity_1.type == 'player' ? [entity_1, entity_2] : [entity_2, entity_1];

            //     if (bullet && player && (bullet.damageOnCollision || player.damageOnCollision)) {
            //         player.health -= bullet.damage;
            //         bullet.destroy();
            //         // console.log(player.health)
            //         if (player.health <= 0)
            //             player.destroy();
            //         continue;
            //     }
            Collision.ballToBall(entity_1, entity_2);

        }

        entity.update();
    })
    Renderer.renderPlayer(canvas, (x, y) => ball.render(ctx, { x: x, y: y }));
}