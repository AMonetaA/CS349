import { Drawable } from "./drawable";

export class Score implements Drawable {
    public s = 0;
    constructor(s: number) {
        this.s = s;
    }

    draw(gc: CanvasRenderingContext2D) {
        gc.save();

        gc.font = "16pt sans-serif";
        gc.fillStyle = "black";
        gc.textAlign = "center";
        gc.textBaseline = "middle";
        gc.fillText("Score " + this.s.toString(), gc.canvas.width / 2, 20);

        gc.restore();

    }
}

