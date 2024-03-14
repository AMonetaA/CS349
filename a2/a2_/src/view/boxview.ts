import { Observer } from "../observer";
import { SKContainer } from "../../simplekit/widget";
import { Model } from "../model";
import { Colour } from "../colour";
import { BoxController } from "../controller/boxcontroller";

export class BoxView extends SKContainer implements Observer {

    update(): void {
        if (this.colourType.id == this.model.selected.id) {
            this.border = "black";
        } else {
            this.border = "lightgrey";
        }

        if (this.colourType.id < length) {

            console.log("update which box:" + this.colourType.id)
            this.colourType = this.model.colours[this.colourType.id];
            const colorstr = `hsl(${this.colourType.hue}deg ${this.colourType.sat}% ${this.colourType.lum}%)`;
            this.fill = colorstr;
        }
    }

    colourType: Colour = new Colour(0, 0, 0, 0);

    constructor(private model: Model, controller: BoxController, colour: Colour) {
        super();

        const colorstr = `hsl(${colour.hue}deg ${colour.sat}% ${colour.lum}%)`;
        console.log(colorstr);

        this.fill = colorstr;
        this.border = "lightgrey";


        this.width = 50;
        this.height = 50;

        this.colourType = colour;

        console.log('color id:', colour.id)
        console.log('color:', colour.hue, colour.lum, colour.sat)


        this.addEventListener("action", () => {
            controller.handleBox(colour.id);
            //model.selected = model.colors[colour.id];

        });

        // register with the model when we're ready
        this.model.addObserver(this);

    }
}