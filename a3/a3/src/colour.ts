export class Colour {
    public id: number
    public hue: number;
    public sat: number;
    public lum: number;

    constructor(id: number, hue: number, sat: number, lum: number) {
        this.id = id;
        this.hue = hue;
        this.sat = sat;
        this.lum = lum;
    }

}