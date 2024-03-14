import { SKContainer, SKLabel, SKTextfield } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";

import { Observer } from "../observer";
import { Model } from "../model";
import { ValueController } from "../controller/valuecontroller";

export class ValueView extends SKContainer implements Observer {

    update(): void {
        const s = this.model.selected;
        this.hueval = s.hue;
        this.satval = s.sat;
        this.lumval = s.lum;

        this.hue.text = this.hueval.toString();
        this.sat.text = this.satval.toString();
        this.lum.text = this.lumval.toString();
    }

    hueLabel: SKLabel = new SKLabel("Hue", 0, 0);
    satLabel: SKLabel = new SKLabel("Sat", 0, 45);
    lumLabel: SKLabel = new SKLabel("Val", 0, 90);

    hueval: number = 0;
    satval: number = 0;
    lumval: number = 0;

    hue: SKTextfield = new SKTextfield("0", 60, 0);
    sat: SKTextfield = new SKTextfield("0", 60, 45);
    lum: SKTextfield = new SKTextfield("0", 60, 90);


    constructor(private model: Model, controller: ValueController) {
        super();

        this.id = "value";
        this.layoutMethod = Layout.makeFixedLayout();


        this.box.padding = 10

        this.fill = "whitesmoke";
        this.border = "grey"
        this.fillWidth = 1 / 3;
        this.fillHeight = 1;

        const s = model.selected;
        this.hue.text = s.hue.toString();
        this.sat.text = s.sat.toString();
        this.lum.text = s.lum.toString();
        this.hue.width = 100;
        this.sat.width = 100;
        this.lum.width = 100;
        this.addChild(this.hue);
        this.addChild(this.sat);
        this.addChild(this.lum);

        this.hueLabel.align = "right";
        this.satLabel.align = "right";
        this.lumLabel.align = "right";
        this.hueLabel.width = 50;
        this.satLabel.width = 50;
        this.lumLabel.width = 50;
        this.addChild(this.hueLabel);
        this.addChild(this.satLabel);
        this.addChild(this.lumLabel);


        // event listener

        this.hue.addEventListener("textchanged", () => {
            const t = this.hue.text;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.hue.text = this.hueval.toString();

            } else if (Number(t) > 360) {
                console.log("invalid num");
                this.hue.text = "360";
                this.hueval = 360;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.hue.text = "0";
                this.hueval = 0;

            } else {
                this.hueval = Number(t);
            }

            controller.handleHue(this.hueval);
        });

        this.sat.addEventListener("textchanged", () => {
            const t = this.sat.text;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.sat.text = this.satval.toString();

            } else if (Number(t) > 100) {
                console.log("invalid num");
                this.sat.text = "100";
                this.satval = 100;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.sat.text = "0";
                this.satval = 0;

            } else {
                this.satval = Number(t);
            }

            controller.handleSat(this.satval);
        });

        this.lum.addEventListener("textchanged", () => {
            const t = this.lum.text;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.lum.text = this.lumval.toString();

            } else if (Number(t) > 100) {
                console.log("invalid num");
                this.lum.text = "100";
                this.lumval = 100;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.lum.text = "0";
                this.lumval = 0;

            } else {
                this.lumval = Number(t);
            }

            controller.handleLum(this.lumval);
        });

        this.model.addObserver(this);

    }
}