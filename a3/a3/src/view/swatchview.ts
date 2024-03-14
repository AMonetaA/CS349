import { Observer } from "../observer";
import { Model } from "../model";
import { BoxView } from "./boxview";


export class SwatchView implements Observer {

  update(): void {
    console.log("update swatch")
    // clear child
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
      console.log("remove");
    }
    // add all child from color
    this.model.colours.forEach((c) => {
      const box = new BoxView(this.container, this.model, c);
    })
  }

  container: HTMLElement;

  constructor(parent: HTMLElement, private model: Model) {

    const template = document.getElementById(
      "swatchtemp"
    ) as HTMLTemplateElement;
    if (!template) throw new Error("swatch template not found");

    // clone the template to create a new view
    const view = template.content.cloneNode(true) as DocumentFragment;

    // important to do this before inserting into the DOM
    const el = view.getElementById("swatch") as HTMLElement;
    if (!el) throw new Error("swatch div not found");
    this.container = el;


    // insert view into the parent
    parent.appendChild(view);


    model.colours.forEach((c) => {
      const box = new BoxView(this.container, model, c);
    })

    this.model.addObserver(this);

  }
}