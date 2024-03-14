import { SKEvent, SKMouseEvent, SKKeyboardEvent } from "../../simplekit";
import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  setSKAnimationCallback


} from "../../simplekit";
import { CallbackTimer } from "./timer";

import { SimonLogic } from "../../simonlogic";
import { Score } from "./score"
import { Button } from "./button"

console.log("TypeScriptahaha");

var currTime = 0;
var game = new SimonLogic();
var currscore = new Score(game.score);


const buttons: Button[] = [];

generateButtons();

startSimpleKit();
setSKEventListener(keyEvent);

var lastHighlight = 0;
var lastPress = 0;
var startTime = 0;
var currNumber = 0;
var isCheating = false;
var sequence: number[] = [];//


function reset() {
  startTime = 0;
  currNumber = 0;
  lastHighlight = 0;
  lastPress = 0;
  while (buttons.length) {
    buttons.pop();
  }
  generateButtons();
  sequence = [];//
}


function keyEvent(e: SKEvent) {

  if (e.type == "keypress") {
    const { key } = e as SKKeyboardEvent;
    if (key == "q") {
      game = new SimonLogic();
      reset();
    } else if (key == " " && (game.state == "START"
      || game.state == "WIN" || game.state == "LOSE")) {
      console.log("space");
      reset();
      game.newRound();
      console.log("key press ", game.state);
      timerComputer.start(currTime);
      startTime = currTime;
      currNumber = game.nextButton();
      //sequence += (currNumber+1).toString();
      sequence.push(currNumber + 1);

    } else if (key == "?") {
      isCheating = !isCheating;
    } else if (key == "+" && (game.state == "START"
      || game.state == "WIN" || game.state == "LOSE")) {
      if (game.buttons < 10) {
        game.buttons++;
        reset();
      }
    } else if (key == "-" && (game.state == "START"
      || game.state == "WIN" || game.state == "LOSE")) {
      if (game.buttons > 1) {
        console.log("-")
        game.buttons--;
        reset();
      }
    }
  }

  if (e.type == "click" && game.state == "HUMAN") {
    const me = e as SKMouseEvent;
    const onButton = insideButton(me.x, me.y);

    for (var i = 1; i <= game.buttons; i++) {
      console.log("last press: ", lastPress);
      if (onButton == i) {
        buttons[onButton - 1].isPress = true;
        lastPress = onButton - 1;
        timerHuman.start(currTime);
        startTime = currTime;

      } else if (onButton == -1) {
        buttons[lastPress].isPress = false;

      } else {
        buttons[i - 1].isPress = false;
      }
    }
  }

  if (e.type == "mousemove" && game.state == "HUMAN"
    && !timerComputer.isRunning && !timerGap.isRunning) {
    const me = e as SKMouseEvent;
    const onButton = insideButton(me.x, me.y);

    for (var i = 1; i <= game.buttons; i++) {
      if (onButton == i) {
        buttons[lastPress].isHighlight = false;
        buttons[onButton - 1].isHighlight = true;
        lastHighlight = onButton - 1;
      } else if (onButton == -1) {
        buttons[lastPress].isHighlight = false;
        buttons[lastHighlight].isHighlight = false;
      } else {
        buttons[i - 1].isHighlight = false;
      }
    }
  }
}

function insideButton(x: number, y: number): number {
  for (var i = game.buttons - 1; i >= 0; i--) {
    const dis = Math.sqrt(Math.pow(x - buttons[i].x, 2)
      + Math.pow(y - buttons[i].y, 2));
    if (dis <= buttons[i].r) {
      return i + 1;
    }
  }
  return -1;
}

function drawMessage(gc: CanvasRenderingContext2D, msg: string) {
  gc.save();
  gc.font = "16pt sans-serif";
  gc.fillStyle = "black";
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillText(msg, gc.canvas.width / 2, gc.canvas.height - 20);
  gc.restore();
}

function drawCheating(gc: CanvasRenderingContext2D) {
  gc.save();
  gc.font = "16pt sans-serif";
  gc.fillStyle = "grey";
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillText("CHEATING", gc.canvas.width - 80, gc.canvas.height - 20);
  gc.restore();
}

function generateButtons() {
  for (var i = 1; i <= game.buttons; i++) {
    var h = (360 / game.buttons) * (i - 1);
    var temp = new Button(0, 0, i, `hsl(${h}deg 70% 45%)`);
    buttons.push(temp);
  }
}





const timerComputer = new CallbackTimer(500, (t) => {
  console.log("Computer time up", currNumber);
  buttons[currNumber].r = 120;
  timerGap.start(t);
})

const timerGap = new CallbackTimer(500, (t) => {
  console.log("Gap time up", currNumber);
  if (game.index != 0 && game.state == "COMPUTER") {
    startTime = currTime;
    currNumber = game.nextButton();
    //sequence += "," + (currNumber+1).toString();
    sequence.push(currNumber + 1);
    timerComputer.start(t);
  }
})

const timerHuman = new CallbackTimer(500, (t) => {
  console.log("Human time up");
  var isWin = game.verifyButton(lastPress);
  buttons[lastPress].r = 120;
  sequence.shift()
  console.log(isWin);
  if (!isWin) {
    startTime = currTime;
    timerLose.start(t);
  }
})

const timerLose = new CallbackTimer(1500, (t) => {
  console.log("Lose animation");
})




setSKDrawCallback((gc, time) => {
  // Initialize game background
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  currTime = time;
  currscore.s = game.score;

  if (isCheating) {
    drawCheating(gc);
  }

  if (game.state == "START") {
    currscore.draw(gc);

    for (var i = 0; i < buttons.length; i++) {
      var theta = time / 1000;
      var dy = 100 * Math.sin(theta + i / 5);
      buttons[i].updatePos((gc.canvas.width / (game.buttons + 1)) * (i + 1), gc.canvas.height / 2 + dy);
      buttons[i].draw(gc);
    }
    drawMessage(gc, "Press SPACE to play")

  } else if (game.state == "COMPUTER" || timerComputer.isRunning || timerGap.isRunning) {
    currscore.draw(gc);

    for (var i = 0; i < buttons.length; i++) {
      if ((i == currNumber) && timerComputer.isRunning) {
        buttons[i].r = 120 + ((time - startTime) / 500) * 30;
      }
      buttons[i].updatePos((gc.canvas.width / (game.buttons + 1)) * (i + 1), gc.canvas.height / 2);
      buttons[i].draw(gc);
    }

    drawMessage(gc, "Watch what I do ...")



  } else if (game.state == "HUMAN" && !timerComputer.isRunning && !timerGap.isRunning) {
    currscore.draw(gc);
    for (var i = 0; i < buttons.length; i++) {
      if ((buttons[i].isPress) && timerHuman.isRunning) {
        buttons[i].r = 120 + ((time - startTime) / 500) * 30;
      }
      buttons[i].updatePos((gc.canvas.width / (game.buttons + 1)) * (i + 1), gc.canvas.height / 2);
      buttons[i].draw(gc);
    }
    if (isCheating) {
      drawMessage(gc, sequence.toString());
    } else {
      drawMessage(gc, "Now it's you turn");
    }


  } else if (game.state == "LOSE") {
    currscore.draw(gc);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].isHighlight = false;

      if (timerLose.isRunning) {
        console.log("decrease");
        var newy = gc.canvas.height / 2 + 3 * (time - startTime);
        buttons[i].updatePos((gc.canvas.width / (game.buttons + 1)) * (i + 1), newy);
      }
      buttons[i].draw(gc);
    }
    drawMessage(gc, "You lose. Press SPACE to play again");

  } else if (game.state == "WIN") {
    currscore.draw(gc);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].isHighlight = false;
      buttons[i].updatePos((gc.canvas.width / (game.buttons + 1)) * (i + 1), gc.canvas.height / 2);
      buttons[i].draw(gc);
    }
    drawMessage(gc, "You won! Press SPACE to continue")
  }
})



setSKAnimationCallback((time) => {
  timerComputer.update(time);
  timerGap.update(time);
  if (game.state == "HUMAN") {
    timerHuman.update(time);
  }
  timerLose.update(time);
})






