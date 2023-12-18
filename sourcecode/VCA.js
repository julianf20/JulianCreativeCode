let VCAs = [];

class VCA {
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
      fill(210);
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
        click = 300 + 10 * this.id;
      }
    }
  }
}

class VCAio {
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
      hover = 3000 + this.pid * 10 + this.ioid;
    }
    if (clicked && mouseIsPressed && !click) {
      click = 3000 + this.pid * 10 + this.ioid;
    }
  }
}

function createNewVCA(x, y) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  let vca = new VCA();
  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  vca.x = x - 70;
  vca.y = y;
  vca.l = 60;
  vca.h = 300;

  for (let i = 0; i < 4; ++i) {
    vca.io[i] = new VCAio();
    vca.io[i].ioid = i;
    vca.io[i].x = vca.x + 30
    vca.io[i].y = vca.y + 50 + i * 64
  }

  let create = 1;
  for (let i = 0; i < VCAs.length; ++i) {
    if (
      x + 70 > VCAs[i].x &&
      x - 70 < VCAs[i].x + VCAs[i].l &&
      y == VCAs[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    VCAs.push(vca);
  }
}

function drawVCAs() {
  for (let i = 0; i < VCAs.length; ++i) {
    VCAs[i].id = i;
    VCAs[i].show();
    for (let j = 0; j < 4; ++j) {
      VCAs[i].io[j].show();
      VCAs[i].io[j].checkClicked();
      VCAs[i].io[j].pid = i;
    }
    VCAs[i].checkClicked();
  }

  if (click > 299 && click < 400) {
    if (click % 10 == 0) {
      VCAs[(click - 300) / 10].disp = 0;
      push();
      noStroke();
      fill(200);
      rect(mouseX - 30, mouseY - 150, 60, 300);
      pop();
    }
  }
}

function updateVCAPos(x, y, id) {
  let disty; //FIX
  for (let i = 0; i < 3; ++i) {
    disty = abs(150 + i * 300 - y);
    if (disty < 150) {
      y = i * 300;
    }
  }
  id = (id - 300) / 10;

  if (x < 70) {
    x = 70;
  }
  x = round(x / 10) * 10;
  x = x - 70;

  let create = 1;
  for (let i = 0; i < VCAs.length; ++i) {
    if (
      x + 70 > VCAs[i].x &&
      x - 70 < VCAs[i].x + VCAs[i].l &&
      y == VCAs[i].y
    ) {
      create = 0;
    }
  }

  if (create) {
    VCAs[id].x = x;
    VCAs[id].y = y;
  for (let i = 0; i < 4; ++i) {
    VCAs[id].io[i].x = VCAs[id].x + 30
    VCAs[id].io[i].y = VCAs[id].y + 50 + i * 64
  }
  }
  VCAs[id].disp = 1;
}

function deleteVCA(id) {
  id = (id - 300) / 10;
  VCAs.splice(id, 1);
}
