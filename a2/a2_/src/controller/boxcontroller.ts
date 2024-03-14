import { Model } from "../model";

export class BoxController {
    constructor(private model: Model) { }

    handleBox(id: number) {
        // this.model.increment();
        this.model.changeSelected(id);
    }
}