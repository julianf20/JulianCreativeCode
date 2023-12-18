function setupScreen() {
  setupaddButtons();
}

function setupaddButtons() {
  let addbuttonStrings = ["VCO", "OUT", "VCA", "VCF", "DEL"]
  for (let i = 0; i < 5; ++i) {
    addButtons[i] = new addButton();
    addButtons[i].x = 700;
    addButtons[i].y = 200 + i * 140;
    addButtons[i].l = 100;
    addButtons[i].h = 100;
    addButtons[i].string = addbuttonStrings[i]
    addButtons[i].id = i;
    addButtons[i].drawAdderImg = 60 * i;
  }
}