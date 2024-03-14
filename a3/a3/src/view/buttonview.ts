import { Observer } from "./../observer";
import { Model } from "./../model";
import { ButtonController } from "../controller/buttoncontroller";
//import { CButton } from "../Cbutton";

export class ButtonView implements Observer {
    update(): void {
    }

    buttonAdd: HTMLButtonElement;
    buttonDelete: HTMLButtonElement;

    constructor(parent: HTMLElement, private model: Model, controller: ButtonController) {

        const template = document.getElementById("toolbartemp") as HTMLTemplateElement;
        if (!template) throw new Error("toolbar template not found");

        const view = template.content.cloneNode(true) as DocumentFragment;

        const el1 = view.querySelector("button#add") as HTMLButtonElement;
        if (!el1) throw new Error("add button not found");
        this.buttonAdd = el1;

        const el2 = view.querySelector("button#delete") as HTMLButtonElement;
        if (!el2) throw new Error("delete button not found");
        this.buttonDelete = el2;

        parent.appendChild(view);



        this.buttonAdd.addEventListener("click", () => {

            controller.handleAddButtonPress();

            if (this.model.length < 16) {
                this.buttonAdd.disabled = false;
            } else {
                this.buttonAdd.disabled = true;

            }

            if (this.model.length > 1) {
                this.buttonDelete.disabled = false;
            } else {
                this.buttonDelete.disabled = true;
            }
        });

        this.buttonDelete.addEventListener("click", () => {

            controller.handleDeleteButtonPress();

            if (this.model.length > 1) {
                this.buttonDelete.disabled = false;
            } else {
                this.buttonDelete.disabled = true;
            }

            if (this.model.length < 16) {
                this.buttonAdd.disabled = false;
            } else {
                this.buttonAdd.disabled = true;
            }

        });

        this.model.addObserver(this);

    }
}