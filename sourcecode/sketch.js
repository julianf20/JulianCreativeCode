let click = 0;
let hover = 0;

function setup() {
  createCanvas(800, 910);
  setupScreen();
  
  const synth = new Tone.Synth().toMaster();
const now = Tone.now();
synth.triggerAttackRelease("C4", "8n", now)
synth.triggerAttackRelease("E4", "8n", now + 0.5)
synth.triggerAttackRelease("G4", "8n", now + 1)
}

function draw() {
  hover = 0
  background(220);
  drawScreenItems();
  


  drawaddButtons();
  drawVCOs();
  drawMixers();
  drawVCAs();
  drawCables();
  

  
}
//300 x 70
function drawScreenItems() {
  push()
  noStroke()
  fill(150)
  rect(0,0,800,10)
  rect(0,290,800,10)
  rect(0,300,800,10)
  rect(0,590,800,10)
  rect(0,600,800,10)
  rect(0,890,800,10)
  rect(0,900,800,10)
  fill(200)
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 5, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 295, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 305, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 595, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 605, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 895, 8)
  }
  for (let i = 0; i < 80; ++i) {
    circle(i * 10 + 5, 905, 8)
  }
  pop()
}

