import { Model } from "./../model";

import { random } from "../../simplekit/utility";

export class ButtonController {
    constructor(private model: Model) { }

    handleAddButtonPress() {
        if (this.model.length < 16) {
            this.model.addColor(this.model.length, Math.round(random(0, 360)),
                Math.round(random(0, 100)), Math.round(random(0, 100)));
            console.log('add' + this.model.length);
        }
    }

    handleDeleteButtonPress() {
        if (this.model.length > 1) {
            this.model.deleteColor(this.model.selected.id);
            console.log('delete' + this.model.selected.id);
            this.model.changeSelected(0);
        }
    }
}
