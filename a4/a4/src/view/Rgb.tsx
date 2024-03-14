import { selected, Colour, colours, changeSelectedHsl } from "../AppState";
import { useState } from "preact/hooks";
import style from "../style/Value.module.css";

export function hslToRgb(h: number, s: number, l: number) {
  h = h % 360; // Ensure hue is within 0-360 range
  s = s / 100; // Convert saturation to 0-1 range
  l = l / 100; // Convert lightness to 0-1 range

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic when saturation is 0
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  return [r * 255, g * 255, b * 255].map(Math.round) as [
    number,
    number,
    number
  ];
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achromatic when R, G, and B are equal
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)] as [
    number,
    number,
    number
  ];
}

export default function RgbView() {
  const c = colours.value[selected.value];
  let [r, g, b] = hslToRgb(c.hue, c.sat, c.lum);

  const [inputValuer, setInputValuer] = useState(r);
  const [inputValueg, setInputValueg] = useState(g);
  const [inputValueb, setInputValueb] = useState(b);

  function rinputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 255) {
        setInputValuer(v);
      } else {
        v = 255;
        setInputValuer(v);
      }

      let [h, s, l] = rgbToHsl(v, g, b);
      changeSelectedHsl(h, s, l);
      console.log("inrgb");
    } else {
      e.preventDefault();
    }
  }

  function ginputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 255) {
        setInputValueg(v);
      } else {
        v = 255;
        setInputValueg(v);
      }

      let [h, s, l] = rgbToHsl(r, v, b);
      changeSelectedHsl(h, s, l);
      console.log("inrgb");
    } else {
      e.preventDefault();
    }
  }

  function binputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 255) {
        setInputValueb(v);
      } else {
        v = 255;
        setInputValueb(v);
      }

      let [h, s, l] = rgbToHsl(r, g, v);
      changeSelectedHsl(h, s, l);
      console.log("inrgb");
    } else {
      e.preventDefault();
    }
  }

  return (
    <div class={style.valuebox}>
      <div class={style.value}>
        <div class={style.label}>R</div>
        <input
          class={style.number}
          type="number"
          id="huetext"
          value={r}
          onChange={rinputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="huerange"
          max="255"
          value={r}
          onChange={rinputHandler}
        />
      </div>
      <div class={style.value}>
        <div class={style.label}>G</div>
        <input
          class={style.number}
          type="number"
          id="sattext"
          value={g}
          onChange={ginputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="satrange"
          max="255"
          value={g}
          onChange={ginputHandler}
        />
      </div>
      <div class={style.value}>
        <div class={style.label}>B</div>
        <input
          class={style.number}
          type="number"
          id="lumtext"
          value={b}
          onChange={binputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="lumrange"
          max="255"
          value={b}
          onChange={binputHandler}
        />
      </div>
    </div>
  );
}
