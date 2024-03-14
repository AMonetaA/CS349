import * as AppState from "./../AppState";
import { Colour, colours } from "./../AppState";

import style from "../style/Box.module.css";

type BoxProps = {
  box: Colour;
};

export default function BoxView({ box }: BoxProps) {
  let c = colours.value[box.id];
  console.log("Boxview ");

  const colorstr = `hsl(${c.hue}deg ${c.sat}% ${c.lum}%)`;

  if (box.id == AppState.selected.value) {
    return (
      <div
        class={style.selected}
        style={{ backgroundColor: colorstr }}
        onClick={() => AppState.changeSelected(box.id)}
      ></div>
    );
  }
  return (
    <div
      class={style.root}
      style={{ backgroundColor: colorstr }}
      onClick={() => AppState.changeSelected(box.id)}
    >
      {" "}
    </div>
  );
}
