import { SKContainer } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";

import { Observer } from "./../observer";
import { Model } from "./../model";
import { ButtonController } from "../controller/buttoncontroller";
import { CButton } from "../Cbutton";

export class ButtonView extends SKContainer implements Observer {
    update(): void {
        this.buttonAdd.text = "Add";
    }

    buttonAdd: CButton = new CButton("Add", 0, 0);
    buttonDelete: CButton = new CButton("Delete", 110, 0);

    constructor(private model: Model, controller: ButtonController) {
        super();


        // setup the view
        this.id = "toolbar";
        this.layoutMethod = Layout.makeFixedLayout();
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.fill = "lightgrey";
        this.box.padding = 10;

        // add a button to the view
        this.buttonAdd.width = 100;
        this.addChild(this.buttonAdd);

        // add a button to the view
        this.buttonDelete.width = 100;
        this.addChild(this.buttonDelete);

        // set an event handler for button "action" event
        this.buttonAdd.addEventListener("action", () => {

            controller.handleAddButtonPress();

            if (this.model.length < 16) {
                this.buttonAdd.colour = "black";
            } else {
                this.buttonAdd.colour = "grey";
            }

            if (this.model.length > 1) {
                this.buttonDelete.colour = "black";
            } else {
                this.buttonDelete.colour = "grey";
            }
        });

        this.buttonDelete.addEventListener("action", () => {

            controller.handleDeleteButtonPress();

            if (this.model.length > 1) {
                this.buttonDelete.colour = "black";
            } else {
                this.buttonDelete.colour = "grey";
            }

            if (this.model.length < 16) {
                this.buttonAdd.colour = "black";
            } else {
                this.buttonAdd.colour = "grey";
            }

        });

        // register with the model when we're ready
        this.model.addObserver(this);

    }
}