import { render } from "preact";

import ButtonView from "./view/Button";
import EditorView from "./view/Editor";
import StatusView from "./view/Status";
import SwatchView from "./view/Swatch";
import * as AppStatus from "./AppState";

import "./style.css";
import style from "./App.module.css";

console.log("style-module");

// get ref for node to insert the app
const app = document.querySelector("div#app");
if (!app) throw new Error("no app div");

AppStatus.initColour(10);

export default function App() {
  return (
    <div class={style.root}>
      {/* container */}
      <div class={style.container}>
        {/* views */}
        <ButtonView />
        <EditorView />
        <SwatchView />
        <StatusView />
      </div>
    </div>
  );
}

render(<App />, app);
