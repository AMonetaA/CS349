import * as Style from "../simplekit/widget/style";
import { SKButton } from "../simplekit/widget";

export class CButton extends SKButton {

  public colour: string = "black";


  constructor(
    text: string,
    x = 0,
    y = 0,
    width?: number,
    height?: number
  ) {
    super(text, x, y, width, height);
    this.box.padding = Style.textPadding;
    this.text = text;
  }
  // "--------------------------------"

  draw(gc: CanvasRenderingContext2D) {
    // let colour = this.isDisable ? "grey" : "black";
    // if(this.isDisable) {
    //   colour = "grey";
    //   // console.log("-------------------------------------------------------")
    // }

    // to save typing "this" so much
    const box = this.box;

    gc.save();

    const w = box.paddingBox.width;
    const h = box.paddingBox.height;

    gc.translate(this.box.margin, this.box.margin);

    // thick highlight rect
    if ((this.state == "hover" || this.state == "down") && this.colour == "black") {
      gc.beginPath();
      gc.roundRect(this.x, this.y, w, h, 4);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.roundRect(this.x, this.y, w, h, 4);
    gc.fillStyle =
      (this.state == "down" && this.colour == "black") ? Style.highlightColour : "lightgrey";
    gc.strokeStyle = this.colour;
    // change fill to show down state
    gc.lineWidth = (this.state == "down" && this.colour == "black") ? 4 : 2;
    gc.fill();
    gc.stroke();
    gc.clip(); // clip text if it's wider than text area

    // button label
    gc.font = Style.font;
    gc.fillStyle = this.colour;
    gc.textAlign = "center";
    gc.textBaseline = "middle";
    gc.fillText(this.text, this.x + w / 2, this.y + h / 2);

    gc.restore();

    // element draws debug viz if flag is set
    // super.draw(gc);
  }

  public toString(): string {
    return `SKButton '${this.text}'`;
  }
}
