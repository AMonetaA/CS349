import { signal } from "@preact/signals";

export class Colour {
    public id: number
    public hue: number;
    public sat: number;
    public lum: number;

    constructor(id: number, hue: number, sat: number, lum: number) {
        this.id = id;
        this.hue = hue;
        this.sat = sat;
        this.lum = lum;
    }

}

function random(a: number, b?: number): number {
    if (b != undefined) {
        return a + Math.random() * (b - a);
    } else {
        return Math.random() * a;
    }
}

export const colours = signal<Colour[]>([]);
export var length = signal(0);
export var selected = signal(0);

export const initColour = (id: number) => {
    for (let i = 0; i < id; i++) {
        addColour(i);
    }
    selected.value = 0;
}

export const addColour = (i: number) => {
    colours.value = [
        ...colours.value,
        {
            id: i,
            hue: Math.round(random(0, 360)),
            sat: Math.round(random(0, 100)),
            lum: Math.round(random(0, 100))
        },
    ];
    selected.value = length.value;
    length.value++;
    console.log("ADD COLOUR " + length.value)
}

export const deleteColour = (n: number) => {
    const temp: Colour[] = [];

    for (let i = 0; i < length.value; i++) {

        if (i != selected.value) {
            temp.push(colours.value[i]);
            console.log(i)
            temp[temp.length - 1].id = temp.length - 1;
        }
    }
    selected.value = 0;
    colours.value = temp;
    length.value--;

}

export const changeSelected = (id: number) => {
    selected.value = id;
}

export const changeSelectedHsl = (hue: number, sat: number, lum: number) => {
    // colours.value[selected.value].hue = hue;
    // colours.value[selected.value].sat = sat;
    // colours.value[selected.value].lum = lum;
    // let id = selected.value;
    // selected.value = id;
    console.log("change hsl");
    const temp: Colour[] = [];
    for (let i = 0; i < length.value; i++) {
        temp.push(colours.value[i]);
        if (i == selected.value) {
            temp[i].hue = hue;
            temp[i].sat = sat;
            temp[i].lum = lum;
        }
    }
    colours.value = temp;
}
