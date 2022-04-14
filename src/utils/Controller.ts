abstract class IController {
    static UP: boolean;
    static DOWN: boolean;
    static LEFT: boolean;
    static RIGHT: boolean;
}

class Controller extends IController {
    static handleKeys(event: KeyboardEvent) {
        let state = event.type == 'keydown' ? true : false;

        switch (event.key) {
            case 'w': case 'ArrowUp': 
                Controller.UP = state;
                break; 
            case 'a': case 'ArrowLeft':
                Controller.LEFT = state;
                break; 
            case 'd': case 'ArrowRight':
                Controller.RIGHT = state;
                break;
            case 's': case 'ArrowDown':
                Controller.DOWN = state;
                break;
        }
    }
}

export default Controller;