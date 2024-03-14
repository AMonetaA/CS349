import { Observer } from "./../observer";
import { Model } from "./../model";
import { ColourView } from "./colourview";
import { ValueView } from "./valueview";
import { ValueController } from "../controller/valuecontroller";

export class EditorView implements Observer {
    update(): void {
        //this.container.innerHTML = "";
    }

    container: HTMLElement;
    colorBox: ColourView;
    valueBox: ValueView;

    constructor(parent: HTMLElement, private model: Model) {

        const template = document.getElementById(
            "editortemp"
        ) as HTMLTemplateElement;
        if (!template) throw new Error("editor template not found");

        // clone the template to create a new view
        const view = template.content.cloneNode(true) as DocumentFragment;

        // important to do this before inserting into the DOM
        const el = view.getElementById("editor") as HTMLElement;
        if (!el) throw new Error("editor div not found");
        this.container = el;

        this.colorBox = new ColourView(view, model);
        this.valueBox = new ValueView(view, model, new ValueController(model));

        // insert view into the parent
        parent.appendChild(view);

    }

}