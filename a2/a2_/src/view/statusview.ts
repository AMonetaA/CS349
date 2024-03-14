import { Observer } from "../observer";
import { SKContainer, SKLabel } from "../../simplekit/widget";
import { Model } from "../model";
import { StatusController } from "../controller/statuscontroller";
import * as Layout from "../../simplekit/layout";

export class StatusView extends SKContainer implements Observer {

    update(): void {
        // this.color = ...
        const s = this.model.selected;
        this.msg.text = this.model.colours.length + " swatches (sectected #" + (s.id + 1) + ")";
    }

    msg: SKLabel = new SKLabel("10 swatches (selected #1)");

    constructor(private model: Model, controller: StatusController) {
        super();

        this.fill = "lightgrey";

        this.fillWidth = 1;
        this.fillHeight = 1;
        this.layoutMethod = Layout.makeFillRowLayout();
        this.box.padding = 10;

        this.msg.fillWidth = 1;
        this.msg.align = "right";
        this.addChild(this.msg);

        this.addEventListener("action", () => {
            controller.handleStatus();
        });

        // register with the model when we're ready
        this.model.addObserver(this);

    }
}