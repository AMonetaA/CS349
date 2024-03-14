import { Observer } from "../observer";
import { Model } from "../model";
import { ValueController } from "../controller/valuecontroller";

export class ValueView implements Observer {

    update(): void {
        const s = this.model.selected;
        this.hueval = s.hue;
        this.satval = s.sat;
        this.lumval = s.lum;

        this.huetext.value = this.hueval.toString();
        this.sattext.value = this.satval.toString();
        this.lumtext.value = this.lumval.toString();

        this.huerange.value = this.hueval.toString();
        this.satrange.value = this.satval.toString();
        this.lumrange.value = this.lumval.toString();


    }

    hueval: number = 0;
    satval: number = 0;
    lumval: number = 0;

    huetext: HTMLInputElement
    sattext: HTMLInputElement
    lumtext: HTMLInputElement

    huerange: HTMLInputElement
    satrange: HTMLInputElement
    lumrange: HTMLInputElement


    constructor(view: DocumentFragment, private model: Model, controller: ValueController) {
        // important to do this before inserting into the DOM
        const elhue = view.getElementById("huetext") as HTMLInputElement;
        if (!elhue) throw new Error("huetext input not found");
        this.huetext = elhue;

        const elsat = view.getElementById("sattext") as HTMLInputElement;
        if (!elsat) throw new Error("sattext input not found");
        this.sattext = elsat;

        const ellum = view.getElementById("lumtext") as HTMLInputElement;
        if (!ellum) throw new Error("lumtext input not found");
        this.lumtext = ellum;

        const elhuerange = view.getElementById("huerange") as HTMLInputElement;
        if (!elhuerange) throw new Error("huerange input not found");
        this.huerange = elhuerange;

        const elsatrange = view.getElementById("satrange") as HTMLInputElement;
        if (!elsatrange) throw new Error("satrange input not found");
        this.satrange = elsatrange;

        const ellumrange = view.getElementById("lumrange") as HTMLInputElement;
        if (!ellumrange) throw new Error("lumrange input not found");
        this.lumrange = ellumrange;

        const s = model.selected;
        this.huetext.value = s.hue.toString();
        this.sattext.value = s.sat.toString();
        this.lumtext.value = s.lum.toString();
        this.huerange.value = s.hue.toString();
        this.satrange.value = s.sat.toString();
        this.lumrange.value = s.lum.toString();

        this.huetext.addEventListener("input", () => {
            const t = this.huetext.value;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.huetext.value = this.hueval.toString();

            } else if (Number(t) > 360) {
                console.log("invalid num");
                this.huetext.value = "360";
                this.hueval = 360;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.huetext.value = "0";
                this.hueval = 0;

            } else {
                this.hueval = Number(t);
            }
            controller.handleHue(this.hueval);
        });

        this.sattext.addEventListener("input", () => {
            const t = this.sattext.value;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.sattext.value = this.satval.toString();

            } else if (Number(t) > 100) {
                console.log("invalid num");
                this.sattext.value = "100";
                this.satval = 100;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.sattext.value = "0";
                this.satval = 0;

            } else {
                this.satval = Number(t);
            }

            controller.handleSat(this.satval);
        });

        this.lumtext.addEventListener("input", () => {
            const t = this.lumtext.value;
            if (isNaN(Number(t))) {
                console.log("invalid char");
                this.lumtext.value = this.lumval.toString();

            } else if (Number(t) > 100) {
                console.log("invalid num");
                this.lumtext.value = "100";
                this.lumval = 100;

            } else if (Number(t) < 0) {
                console.log("invalid num");
                this.lumtext.value = "0";
                this.lumval = 0;

            } else {
                this.lumval = Number(t);
            }

            controller.handleLum(this.lumval);
        });

        this.huerange.addEventListener("change", () => {
            this.hueval = Number(this.huerange.value);
            controller.handleHue(this.hueval);
        })

        this.satrange.addEventListener("change", () => {
            this.satval = Number(this.satrange.value);
            controller.handleSat(this.satval);
        })

        this.lumrange.addEventListener("change", () => {
            this.lumval = Number(this.lumrange.value);
            controller.handleLum(this.lumval);
        })

        this.model.addObserver(this);

    }
}