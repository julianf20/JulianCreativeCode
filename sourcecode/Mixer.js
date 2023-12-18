let Mixers = [];

class Mixer {
  constructor() {
    this.x;
    this.y;
    this.l;
    this.h;
    this.id;
    this.disp = 1;
    this.io = [];
  }

  show() {
    if (this.disp) {
      push();
      noStroke();
      fill(280);
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
        click = 200 + 10 * this.id;
      }
    }
  }
}

class Mixerio {
  constructor() {
    this.x;
    this.y;
    this.d = 24;
    this.c = 100;
    this.ioid;
    this.pid;
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
      hover = 2000 + this.pid * 10 + this.ioid;
    }
    if (clicked && mouseIsPressed && !click) {
      click = 2000 + this.pid * 10 + this.ioid;
    }
  }
}

function drawMixers() {
  for (let i = 0; i < Mixers.length; ++i) {
    Mixers[i].id = i;
    Mixers[i].show();
    for (let j = 0; j < Mixers[i].io.length; ++j) {
      Mixers[i].io[j].show();
      Mixers[i].io[j].pid = i;
      Mixers[i].io[j].checkClicked();
    }
    Mixers[i].checkClicked();
  }

  if (click > 199 && click < 300) {
    if (click % 10 == 0) {
      Mixers[(click - 200) / 10].disp = 0;
      push();
      noStroke();
      fill(200);
      rect(mouseX - 60, mouseY - 120, 120, 300);
      pop();
    }
  }
}

function createNewMixer(x, y) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  let mxr = new Mixer();
  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  mxr.x = x - 70;
  mxr.y = y;
  mxr.l = 120;
  mxr.h = 300;

  for (let i = 0; i < 8; ++i) {
    mxr.io[i] = new Mixerio();
    mxr.io[i].ioid = i;
    let t = 0;
    if (i % 2 == 0) {
      mxr.io[i].x = mxr.x + 30;
      t = 1;
    } else {
      mxr.io[i].x = mxr.x + 90;
    }
    if (t) {
      mxr.io[i].y = mxr.y + 40 + i * 36;
    } else {
      mxr.io[i].y = mxr.y + 40 + (i - 1) * 36;
    }
  }
  mxr.io[8] = new Mixerio();
  mxr.io[8].x = mxr.x + 60;
  mxr.io[8].y = mxr.y + 148;
  mxr.io[8].ioid = 8

  let create = 1;
  for (let i = 0; i < Mixers.length; ++i) {
    if (
      x + 70 > Mixers[i].x &&
      x - 70 < Mixers[i].x + Mixers[i].l &&
      y == Mixers[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    Mixers.push(mxr);
  }
}

function updateMixerPos(x, y, id) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  id = (id - 200) / 10;

  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  x = x - 70;

  let create = 1;
  for (let i = 0; i < Mixers.length; ++i) {
    if (
      x + 70 > Mixers[i].x &&
      x - 70 < Mixers[i].x + Mixers[i].l &&
      y == Mixers[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    Mixers[id].x = x;
    Mixers[id].y = y;
    for (let i = 0; i < 8; ++i) {
      let t = 0;
      if (i % 2 == 0) {
        Mixers[id].io[i].x = Mixers[id].x + 30;
        t = 1;
      } else {
        Mixers[id].io[i].x = Mixers[id].x + 90;
      }
      if (t) {
        Mixers[id].io[i].y = Mixers[id].y + 40 + i * 36;
      } else {
        Mixers[id].io[i].y = Mixers[id].y + 40 + (i - 1) * 36;
      }
    }
  }
  Mixers[id].disp = 1;
}

function deleteMixer(id) {
  id = (id - 200) / 10;
  Mixers.splice(id, 1);
}
