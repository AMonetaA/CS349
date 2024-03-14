// local imports
import { Model } from "./model";
import { ButtonController } from "./controller/buttoncontroller";
import { ButtonView } from "./view/buttonview";
import { EditorView } from "./view/editorview";
import { SwatchView } from "./view/swatchview";
import { StatusView } from "./view/statusview";

// data
const model = new Model();
model.initColor();

// get reference to panel
const panel = document.getElementById("panel") as HTMLElement;
if (!panel) throw new Error("panel not found")

// clear the panel of any content
panel.innerHTML = "";
const toolbar = new ButtonView(panel, model, new ButtonController(model));
const editor = new EditorView(panel, model);
const swatch = new SwatchView(panel, model);
const status = new StatusView(panel, model);
