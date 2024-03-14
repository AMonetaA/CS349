import BoxView from "./Box";
import * as AppState from "../AppState";

import style from "../style/Swatch.module.css";

export default function SwatchView() {
  console.log("Swatchview111");
  return (
    <div class={style.root}>
      {AppState.colours.value.map((colour) => (
        <BoxView box={colour} />
      ))}
    </div>
  );
}
