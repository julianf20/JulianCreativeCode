let VCOs = [];

class VCO {
  constructor() {
    this.x;
    this.y;
    this.l;
    this.h;
    this.id;
    this.disp = 1;
    this.io = [];
    this.synth;
    this.note = 21
  }

  show() {
    if (this.disp) {
      push();
      noStroke();
      fill(180);
      rect(this.x, this.y, this.l, this.h);
      pop();
    } else {
      push();
      noStroke();
      fill(210);
      rect(this.x, this.y, this.l, this.h);
      pop();
    }
  }

  checkClicked() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.l &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      if (mouseIsPressed && !click) {
        click = 100 + 10 * this.id;
      }
    }
  }
}

class VCOio {
  constructor() {
    this.x;
    this.y;
    this.d = 24;
    this.c = 100;
    this.ioid;
    this.pid
  }

  show() {
    push();
    noStroke();
    fill(this.c);
    circle(this.x, this.y, this.d);
    pop();
  }

  checkClicked() {
    let clicked = dist(this.x, this.y, mouseX, mouseY) < this.d / 2;
    if (clicked) {
      hover = 1000 + this.pid * 10 + this.ioid
    }
    if (clicked && mouseIsPressed && !click) {
      click = 1000 + this.pid * 10 + this.ioid
      deleteCable()
    }
  }
}

function drawVCOs() {
  for (let i = 0; i < VCOs.length; ++i) {
    VCOs[i].id = i;
    VCOs[i].show();
    for (let j = 0; j < VCOs[i].io.length; ++j) {
      VCOs[i].io[j].show();
      VCOs[i].io[j].checkClicked();
      VCOs[i].io[j].pid = i
    }
    VCOs[i].checkClicked();
  }

  if (click > 99 && click < 200) {
    if (click % 10 == 0) {
      VCOs[(click - 100) / 10].disp = 0;
      push();
      noStroke();
      fill(200);
      rect(mouseX - 60, mouseY - 150, 120, 300);
      pop();
    }
  }
}

function createNewOscillator(x, y) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  let vco = new VCO();
  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  vco.x = x - 70;
  vco.y = y;
  vco.l = 120;
  vco.h = 300;
  
  vco.synth = new Tone.Oscillator().toMaster();

  for (let i = 0; i < 4; ++i) {
    vco.io[i] = new VCOio();
    vco.io[i].x = vco.x + 15 + i * 30;
    vco.io[i].y = vco.y + 250;
    vco.io[i].ioid = i
  }
  vco.io[4] = new VCOio()
  vco.io[4].x = vco.x + 30
  vco.io[4].y = vco.y + 60
  vco.io[4].ioid = 4

  let create = 1;
  for (let i = 0; i < VCOs.length; ++i) {
    if (
      x + 70 > VCOs[i].x &&
      x - 70 < VCOs[i].x + VCOs[i].l &&
      y == VCOs[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    VCOs.push(vco);
  }
}

function updateVCOPos(x, y, id) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  id = (id - 100) / 10;

  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  x = x - 70;

  let create = 1;
  for (let i = 0; i < VCOs.length; ++i) {
    if (
      x + 70 > VCOs[i].x &&
      x - 70 < VCOs[i].x + VCOs[i].l &&
      y == VCOs[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    VCOs[id].x = x;
    VCOs[id].y = y;
    for (let i = 0; i < 4; ++i) {
      VCOs[id].io[i].x = x + 15 + i * 30;
      VCOs[id].io[i].y = y + 250;
    }
  }
  VCOs[id].disp = 1;
}

function deleteVCO(id) {
  id = (id - 100) / 10;
  VCOs.splice(id, 1);
}

function tuneVCO() {
  let n = floor((mouseX - VCOs[floor(click / 10 % 10)].io[floor(click % 10)].x) / 20) + 21
  VCOs[floor(click / 10 % 10)].note = n
  VCOs[floor(click / 10 % 10)].synth.frequency.value = notes[VCOs[floor(click / 10 % 10)].note]
}

//KEY
//0 == saw
//1 == square
//2 == sine
//3 == triangle
