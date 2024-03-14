import {
  startSimpleKit,
  setSKRoot,
} from "../simplekit";
import * as Layout from "../simplekit/layout";
import { SKContainer } from "../simplekit/widget";

import { makeFillColumnLayout } from "./fillcolumn"


// local imports
import { Model } from "./model";
import { ButtonView } from "./view/buttonview";
import { ButtonController } from "./controller/buttoncontroller";
import { ColorView } from "./view/colorview";
import { ColorController } from "./controller/colorcontroller";
import { ValueView } from "./view/valueview";
import { ValueController } from "./controller/valuecontroller";
import { SwatchView } from "./view/swatchview";
import { SwatchController } from "./controller/swatchcontroller";
import { StatusView } from "./view/statusview";
import { StatusController } from "./controller/statuscontroller";

// data
const model = new Model();
model.initColor();

// root container
const root = new SKContainer(0, 0, 575, 450);
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = makeFillColumnLayout();

// toolbar container
const toolbar = new SKContainer(0, 0);
toolbar.height = 50;
toolbar.fill = "lightgrey";
toolbar.fillWidth = 1;
toolbar.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
toolbar.addChild(new ButtonView(model, new ButtonController(model)));

root.addChild(toolbar);


// editor container
const editor = new SKContainer();

editor.fillWidth = 1;
editor.fillHeight = 1;
editor.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
editor.box.padding = 10;
editor.fill = "whitesmoke";
editor.addChild(new ColorView(model, new ColorController(model)));
editor.addChild(new ValueView(model, new ValueController(model)));
root.addChild(editor);

// swatch contaier
const swatch = new SKContainer();

swatch.fillWidth = 1;
swatch.fillHeight = 1;
swatch.layoutMethod = Layout.makeFillRowLayout();
swatch.box.padding = 10;
swatch.fill = "white";
swatch.addChild(new SwatchView(model, new SwatchController(model)));
root.addChild(swatch);


// footbar container
const footbar = new SKContainer();
footbar.height = 50;
footbar.fill = "lightgrey";
footbar.fillWidth = 1;
footbar.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
footbar.addChild(new StatusView(model, new StatusController(model)));
root.addChild(footbar);





setSKRoot(root);

startSimpleKit();