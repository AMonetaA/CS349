import { signal } from "@preact/signals";
import style from "../style/Value.module.css";
import HslView from "./Hsl";
import RgbView from "./Rgb";
import HexView from "./Hex";

const mode = signal(0);

export default function ValueView() {
  console.log("Valueview");

  function handleClickHsl() {
    mode.value = 0;
  }
  function handleClickRgb() {
    mode.value = 1;
  }
  function handleClickHex() {
    mode.value = 2;
  }

  if (mode.value == 1) {
    return (
      <div class={style.root}>
        <div class={style.checkbox}>
          <input type="radio" name="myRadioGroup" onClick={handleClickHsl} />{" "}
          HSL
          <input
            type="radio"
            name="myRadioGroup"
            onClick={handleClickRgb}
          />{" "}
          RGB
          <input
            type="radio"
            name="myRadioGroup"
            onClick={handleClickHex}
          />{" "}
          Hex
        </div>
        <RgbView />
      </div>
    );
  } else if (mode.value == 2) {
    return (
      <div class={style.root}>
        <div class={style.checkbox}>
          <input type="radio" name="myRadioGroup" onClick={handleClickHsl} />{" "}
          HSL
          <input
            type="radio"
            name="myRadioGroup"
            onClick={handleClickRgb}
          />{" "}
          RGB
          <input
            type="radio"
            name="myRadioGroup"
            onClick={handleClickHex}
          />{" "}
          Hex
        </div>
        <HexView />
      </div>
    );
  }

  return (
    <div class={style.root}>
      <div class={style.checkbox}>
        <input type="radio" name="myRadioGroup" onClick={handleClickHsl} /> HSL
        <input type="radio" name="myRadioGroup" onClick={handleClickRgb} /> RGB
        <input type="radio" name="myRadioGroup" onClick={handleClickHex} /> Hex
      </div>
      <HslView />
    </div>
  );
}
