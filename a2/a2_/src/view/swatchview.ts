import { Observer } from "../observer";
import { SKContainer } from "../../simplekit/widget";
import { Model } from "../model";
import { SwatchController } from "../controller/swatchcontroller";
import { BoxView } from "./boxview";
import { BoxController } from "../controller/boxcontroller";

import * as Layout from "../../simplekit/layout";

export class SwatchView extends SKContainer implements Observer {

    update(): void {
        console.log("update swatch")
        this.clearChildren();
        this.model.colours.forEach((c) => {
            this.addChild(new BoxView(this.model, new BoxController(this.model), c));
        })
    }

    constructor(private model: Model, controller: SwatchController) {
        super();


        this.fill = "white";

        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = Layout.makeWrapRowLayout({ gap: 20 });


        model.colours.forEach((c) => {
            this.addChild(new BoxView(model, new BoxController(model), c));
        })


        this.addEventListener("action", () => {
            controller.handleSwatch();
        });

        // register with the model when we're ready
        this.model.addObserver(this);

    }
}