import { Model } from "./../model";

export class ValueController {
    constructor(private model: Model) { }

    handleHue(n: number) {
        this.model.changeSelectedColor(n, this.model.selected.sat, this.model.selected.lum);
        console.log('Hue');
    }

    handleSat(n: number) {
        this.model.changeSelectedColor(this.model.selected.hue, n, this.model.selected.lum);
        console.log('Sat');
    }

    handleLum(n: number) {
        this.model.changeSelectedColor(this.model.selected.hue, this.model.selected.sat, n);
        console.log('Lum');
    }

}