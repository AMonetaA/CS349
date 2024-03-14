import { Observer } from "../observer";
import { SKContainer } from "../../simplekit/widget";
import { Model } from "../model";
import { ColorController } from "../controller/colorcontroller";

export class ColorView extends SKContainer implements Observer {

    update(): void {
        // this.color = ...
        const s = this.model.selected;
        const colorstr = `hsl(${s.hue}deg ${s.sat}% ${s.lum}%)`;
        this.fill = colorstr;
    }

    constructor(private model: Model, controller: ColorController) {
        super();

        const s = model.selected;
        const colorstr = `hsl(${s.hue}deg ${s.sat}% ${s.lum}%)`;
        this.fill = colorstr;
        this.border = "black";

        this.fillWidth = 2 / 3;
        this.fillHeight = 1;


        this.addEventListener("action", () => {
            controller.handleColor();
        });

        // register with the model when we're ready
        this.model.addObserver(this);

    }
}