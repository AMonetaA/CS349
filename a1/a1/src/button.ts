import { Drawable } from "./drawable";

export class Button implements Drawable {
    public x: number;
    public y: number;
    public r = 120;
    public num: number;
    public color: string;
    public isPress: boolean;
    public isSelect: boolean;
    public isHighlight: boolean;
    constructor(x: number, y: number, num: number, c: string) {
        this.x = x;
        this.y = y;
        this.num = num;
        this.color = c;
        this.isPress = false;
        this.isSelect = false;
        this.isHighlight = false;
    }

    updatePos(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(gc: CanvasRenderingContext2D) {
        gc.save();
        gc.beginPath();
        gc.fillStyle = this.color;
        gc.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        gc.fill();
        gc.restore();

        gc.save();
        gc.font = "40pt sans-serif";
        gc.fillStyle = "white";
        gc.textAlign = "center";
        gc.textBaseline = "middle";
        gc.fillText(this.num.toString(), this.x, this.y);
        gc.restore();

        if (this.isHighlight) {
            gc.save();
            gc.strokeStyle = "yellow";
            gc.lineWidth = 10;
            gc.stroke();
            gc.restore();

        }
    }
}