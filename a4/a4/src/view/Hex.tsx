import { selected, Colour, colours, changeSelectedHsl } from "../AppState";
import { useState } from "preact/hooks";
import { hslToRgb, rgbToHsl } from "./Rgb";

import style from "../style/Value.module.css";
import { signal } from "@preact/signals";

function isValidHex(hex: string): boolean {
  const hexRegex = /^#?([0-9A-Fa-f]{3}){1,2}$/i;
  return hexRegex.test(hex);
}

function hexToRgb(hex: string): [number, number, number] | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const text = signal("");
export default function HexView() {
  const c = colours.value[selected.value];
  let [r, g, b] = hslToRgb(c.hue, c.sat, c.lum);
  let hexval = rgbToHex(r, g, b);

  const [inputValuehex, setInputValuehex] = useState("");

  function hexinputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    if (isValidHex(newValue)) {
      console.log("new value is " + newValue);
      setInputValuehex(newValue);
      const rgbColor = hexToRgb(newValue);

      if (rgbColor !== null) {
        const [r1, g1, b1] = rgbColor;
        console.log(`RGB: ${r1}, ${g1}, ${b1}`);

        let [h, s, l] = rgbToHsl(r1, g1, b1);
        changeSelectedHsl(h, s, l);
        console.log("inhex");
        text.value = "";
      } else {
        console.log("Invalid hex value"); // Handle the case where hex is invalid
      }
    } else {
      setInputValuehex(hexval);
      console.log("invalid");
      text.value = "Invalid: must be valid hex colour";
    }
  }

  return (
    <div class={style.valuebox}>
      <div class={style.value}>
        <input
          class={style.hex}
          id="hextext"
          value={hexval}
          onChange={hexinputHandler}
        />
      </div>
      <div style={"color:red"}>{text.value}</div>
    </div>
  );
}
