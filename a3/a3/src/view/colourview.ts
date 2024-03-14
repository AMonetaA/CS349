import { Observer } from "../observer";
import { Model } from "../model";

export class ColourView implements Observer {

    update(): void {
        // this.color = ...
        const s = this.model.selected;
        const colourstr = `hsl(${s.hue}deg ${s.sat}% ${s.lum}%)`;
        this.container.style.backgroundColor = colourstr;
    }

    container: HTMLElement;

    constructor(view: DocumentFragment, private model: Model) {



        const el = view.getElementById("colourbox") as HTMLElement;
        if (!el) throw new Error("colourview div not found");
        this.container = el;


        const s = model.selected;
        const colourstr = `hsl(${s.hue}deg ${s.sat}% ${s.lum}%)`;

        this.container.style.backgroundColor = colourstr;

        this.model.addObserver(this);

    }
}