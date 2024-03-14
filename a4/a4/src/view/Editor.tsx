import ColourSquareView from "./ColourSquare";
import ValueView from "./Value";

import style from "../style/Editor.module.css";

export default function EditorView() {
  console.log("Editorview");
  return (
    <div class={style.root}>
      <ColourSquareView />
      <ValueView />
    </div>
  );
}
