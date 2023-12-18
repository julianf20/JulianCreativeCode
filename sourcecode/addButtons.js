let addButtons = []

class addButton {
  constructor() {
    this.x;
    this.y;
    this.l;
    this.h;
    this.string;
    this.id
    this.drawaAdderImg;
  }

  show() {
    push();
    noStroke();
    rect(this.x, this.y, this.l, this.h);
    textSize(30);
    text("   +\n" + this.string, this.x + 25, this.y + 40);
    pop();
  }

  checkClicked() {
    if (mouseX > this.x && mouseX < this.x + this.l && mouseY > this.y && mouseY < this.y + this.h) {
      if (mouseIsPressed && !click) {
        click = this.id + 1;
      }
    }
  }
  
  drawAdder() {
    push();
    noStroke()
    fill(this.drawAdderImg)
    rect(mouseX - 60, mouseY - 150, 120, 300);
    pop();
  }
}

function drawaddButtons() {
  
  for (let i = 0; i < addButtons.length; ++i) {
    addButtons[i].show()
    addButtons[i].checkClicked()
  }
  
  if (click > 0 && click < 4) {
    addButtons[click - 1].drawAdder()
  }
  
}