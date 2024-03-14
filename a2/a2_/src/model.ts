import { Subject } from "./observer";
import { Colour } from "./colour";
import { random } from "../simplekit/utility";

export class Model extends Subject {
  
  public selected: Colour = new Colour(0, 0, 0, 0);

  public colours: Colour[] = [];
  public length: number = 0;

  // initialize 10 random color box
  initColor() {
    for (let i = 0; i < 10; i++) {
      this.addColor(i, Math.round(random(0, 360)),
        Math.round(random(0, 100)), Math.round(random(0, 100)));
    }
    this.selected = this.colours[0];
  }

  addColor(id: number, hue: number, sat: number, lum: number) {
    this.length++;
    this.colours.push(new Colour(id, hue, sat, lum));
    this.notifyObservers();
  }

  deleteColor(n: number) {
    const temp: Colour[] = [];

    console.log("--------update after delete------")

    for (let i = 0; i < this.colours.length; i++) {
      if (i != this.selected.id) {
        temp.push(this.colours[i]);
        temp[temp.length - 1].id = temp.length - 1;
      }
    }
    this.selected = new Colour(0, 0, 0, 0);
    this.length--;
    this.colours = temp;
    console.log("length:" + this.colours.length)


    this.notifyObservers();
    console.log("--------end------")
  }

  // change selected colour box
  changeSelected(id: number) {
    this.selected = this.colours[id];
    this.notifyObservers();
  }

  // change Selected color
  changeSelectedColor(hue: number, sat: number, lum: number) {
    this.selected.hue = hue;
    this.selected.sat = sat;
    this.selected.lum = lum;

    this.colours[this.selected.id].hue = hue;
    this.colours[this.selected.id].sat = sat;
    this.colours[this.selected.id].lum = lum;

    this.notifyObservers();
  }
}
