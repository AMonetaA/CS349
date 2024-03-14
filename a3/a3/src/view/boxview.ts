import { Observer } from "../observer";
import { Model } from "../model";
import { Colour } from "../colour";
export class BoxView implements Observer {

    update(): void {
        if (this.colourType.id == this.model.selected.id) {
            this.container.style.borderColor = "black";
        } else {
            this.container.style.borderColor = "lightgrey";
        }

        if (this.colourType.id < length) {
            this.colourType = this.model.colours[this.colourType.id];
            const colorstr = `hsl(${this.colourType.hue}deg ${this.colourType.sat}% ${this.colourType.lum}%)`;
            this.container.style.backgroundColor = colorstr;
        }
    }

    colourType: Colour = new Colour(0, 0, 0, 0);
    container: HTMLElement;

    constructor(parent: HTMLElement, private model: Model, colour: Colour) {

        const template = document.getElementById("boxtemp") as HTMLTemplateElement;
        if (!template) throw new Error("box template not found");

        const view = template.content.cloneNode(true) as DocumentFragment;
        const el = view.getElementById("box") as HTMLElement;
        if (!el) throw new Error("box div not found");
        this.container = el;

        const colorstr = `hsl(${colour.hue}deg ${colour.sat}% ${colour.lum}%)`;
        this.container.style.backgroundColor = colorstr;

        this.colourType = colour;

        parent.appendChild(view);



        this.container.addEventListener("click", () => {
            console.log("click" + colour.id)
            model.changeSelected(colour.id);
        });

        this.model.addObserver(this);

    }
}