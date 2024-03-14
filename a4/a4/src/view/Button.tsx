import * as AppState from "../AppState";
import style from "../style/Button.module.css";

export default function ButtonView() {
  console.log("Buttonview");
  if (AppState.length.value >= 16) {
    return (
      <div class={style.root}>
        <button id="add" style="width: 100px" disabled={true}>
          Add
        </button>
        <button
          id="delete"
          style="width: 100px"
          onClick={() => AppState.deleteColour(AppState.selected.value)}
        >
          Delete
        </button>
      </div>
    );
  } else if (AppState.length.value <= 1) {
    return (
      <div class={style.root}>
        <button
          id="add"
          style="width: 100px"
          onClick={() => AppState.addColour(AppState.length.value)}
        >
          Add
        </button>
        <button id="delete" style="width: 100px" disabled={true}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <div class={style.root}>
      <button
        id="add"
        style="width: 100px"
        onClick={() => AppState.addColour(AppState.length.value)}
      >
        Add
      </button>
      <button
        id="delete"
        style="width: 100px"
        onClick={() => AppState.deleteColour(AppState.selected.value)}
      >
        Delete
      </button>
    </div>
  );
}
