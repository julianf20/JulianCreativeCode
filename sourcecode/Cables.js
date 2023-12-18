let cables = [];

function drawCables() {
  if (click > 999) {
    let x, y;
    if (click < 2000) {
      if (floor(click % 10) < 4 && floor((click / 1000) % 10) == 1) {
        x = VCOs[floor((click / 10) % 10)].io[floor(click % 10)].x;
        y = VCOs[floor((click / 10) % 10)].io[floor(click % 10)].y;
        push();
        strokeWeight(15);
        stroke(0);
        line(x, y, mouseX, mouseY);
        pop();
      } else if (floor(click % 10) == 4) {
        tuneVCO();
      }
    }
    if (floor((click / 1000) % 10) == 2) {
      x = Mixers[floor((click / 10) % 10)].io[8].x;
      y = Mixers[floor((click / 10) % 10)].io[8].y;
      push();
      strokeWeight(15);
      stroke(0);
      line(x, y, mouseX, mouseY);
      pop();
    }
  }
  for (let i = 0; i < cables.length; ++i) {
    cables[i].show();
  }
}

function deleteCable() {
  let index;
  for (let i = 0; i < cables.length; ++i) {
    if (
      (abs(mouseX - cables[i].x1) < 12 && abs(mouseY - cables[i].y1) < 12) ||
      (mouseX - cables[i].x2 < 12 && abs(mouseY - cables[i].y2) < 12)
    ) {
      index = i;
      cables.splice(index, 1);
      VCOs[floor((click / 10) % 10)].synth.stop();
    }
  }
}

function createCable() {
  if (hover > 999) {
    let newC = new cable();

    newC.x1 = VCOs[floor((click / 10) % 10)].io[floor(click % 10)].x;
    newC.y1 = VCOs[floor((click / 10) % 10)].io[floor(click % 10)].y;

    newC.x2 = Mixers[floor((hover / 10) % 10)].io[floor(hover % 10)].x;
    newC.y2 = Mixers[floor((hover / 10) % 10)].io[floor(hover % 10)].y;

    cables.push(newC);

    handleConnect();
  }
}

class cable {
  constructor() {
    this.x1;
    this.y1;
    this.x2;
    this.y2;
    this.c;
  }

  show() {
    push();
    strokeWeight(15);
    stroke(0);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
