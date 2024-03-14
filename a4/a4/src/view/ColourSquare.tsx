import { useRef, useLayoutEffect } from "preact/hooks";
import { hslToRgb } from "./Rgb";
import { colours, selected } from "../AppState";
import style from "../style/ColourSquare.module.css";

type CanvasProps = {
  width?: number;
  height?: number;
};

export function Canvas({ width = 200, height = 200 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [];

  const selectedValue = colours.value[selected.value];

  function draw(gc: CanvasRenderingContext2D) {
    console.log("Selected value is " + selectedValue);
    let hue = selectedValue.hue;

    gc.fillStyle = "black";
    gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

    for (let s = 0; s <= 100; s++) {
      for (let l = 0; l <= 100; l++) {
        const rgbColor = hslToRgb(hue, s, l);
        const color = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

        gc.fillStyle = color;
        gc.fillRect(s * 2, 200 - l * 2, 2, 2);
      }
    }
    drawCircle(gc, selectedValue.sat, selectedValue.lum);
  }

  function drawCircle(gc: CanvasRenderingContext2D, sat: number, lum: number) {
    const x = (sat / 100) * 200;
    const y = 200 - (lum / 100) * 200;

    gc.beginPath();
    gc.arc(x, y, 5, 0, 2 * Math.PI);
    gc.strokeStyle = "black";
    if (y > 125) {
      gc.strokeStyle = "white";
    }
    gc.lineWidth = 1;
    gc.stroke();
  }

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export function CanvasHue({ width = 20, height = 200 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [];

  const selectedValue = colours.value[selected.value];
  function draw(gc: CanvasRenderingContext2D) {
    gc.fillStyle = "black";
    gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

    for (let h = 0; h <= 360; h++) {
      const rgbColor = hslToRgb(h, 100, 50);
      const color = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

      gc.fillStyle = color;
      gc.fillRect(0, (h * 200) / 360, 20, 200 / 360);
    }
    drawRec(gc, selectedValue.hue);
  }

  function drawRec(gc: CanvasRenderingContext2D, hue: number) {
    const y = (hue / 360) * 200 - 2.5; // Centered 5px rectangle
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.strokeRect(0.5, y + 0.5, 19, 4);
  }

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default function ColourSquareView() {
  console.log("ColourSquareview");
  return (
    <div class={style.root}>
      <Canvas width={200} height={200} />
      <CanvasHue width={20} height={200} />
    </div>
  );
}
