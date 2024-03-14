import { Observer } from "../observer";
import { Model } from "../model";

export class StatusView implements Observer {

    update(): void {
        const s = this.model.selected;
        this.container.innerText = this.model.colours.length + " swatches (sectected #" + (s.id + 1) + ")";
    }

    container: HTMLElement;

    constructor(parent: HTMLElement, private model: Model) {

        const template = document.getElementById(
            "statustemp"
        ) as HTMLTemplateElement;
        if (!template) throw new Error("status template not found");

        // clone the template to create a new view
        const view = template.content.cloneNode(true) as DocumentFragment;

        // important to do this before inserting into the DOM
        const el = view.getElementById("status") as HTMLElement;
        if (!el) throw new Error("status div not found");
        this.container = el;

        parent.appendChild(view);

        this.model.addObserver(this);

    }
}