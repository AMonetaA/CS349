import { selected, Colour, colours, changeSelectedHsl } from "../AppState";
import { useState } from "preact/hooks";
import style from "../style/Value.module.css";

export default function HslView() {
  console.log("HSLview");

  const s = colours.value[selected.value];

  const [inputValuehue, setInputValuehue] = useState(s.hue);
  const [inputValuesat, setInputValuesat] = useState(s.sat);
  const [inputValuelum, setInputValuelum] = useState(s.lum);

  function hueinputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 360) {
        setInputValuehue(v);
      } else {
        v = 360;
        setInputValuehue(v);
      }

      changeSelectedHsl(v, s.sat, s.lum);
      console.log("inhsl");
    } else {
      e.preventDefault();
    }
  }

  function satinputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 100) {
        setInputValuesat(v);
      } else {
        v = 100;
        setInputValuesat(v);
      }

      changeSelectedHsl(s.hue, v, s.lum);
      console.log("inhsl");
    } else {
      e.preventDefault();
    }
  }

  function luminputHandler(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    let v = Number(newValue);
    if (!isNaN(Number(newValue))) {
      if (v <= 100) {
        setInputValuelum(v);
      } else {
        v = 100;
        setInputValuelum(v);
      }

      changeSelectedHsl(s.hue, s.sat, v);
      console.log("inhsl");
    } else {
      e.preventDefault();
    }
  }

  return (
    <div class={style.valuebox}>
      <div class={style.value}>
        <div class={style.label}>Hue</div>
        <input
          class={style.number}
          type="number"
          id="huetext"
          value={s.hue}
          onChange={hueinputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="huerange"
          max="360"
          value={s.hue}
          onChange={hueinputHandler}
        />
      </div>
      <div class={style.value}>
        <div class={style.label}>Sat</div>
        <input
          class={style.number}
          type="number"
          id="sattext"
          value={s.sat}
          onChange={satinputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="satrange"
          max="100"
          value={s.sat}
          onChange={satinputHandler}
        />
      </div>
      <div class={style.value}>
        <div class={style.label}>Lum</div>
        <input
          class={style.number}
          type="number"
          id="lumtext"
          value={s.lum}
          onChange={luminputHandler}
        />
        <input
          class={style.range}
          type="range"
          id="lumrange"
          max="100"
          value={s.lum}
          onChange={luminputHandler}
        />
      </div>
    </div>
  );
}
