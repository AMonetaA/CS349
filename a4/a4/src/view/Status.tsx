import { length, selected } from "../AppState";
import style from "../style/Status.module.css";

export default function StatusView() {
  console.log("Statusview");
  return (
    <div class={style.root}>
      {length.value} swatches (selected #{selected.value + 1})
    </div>
  );
}
