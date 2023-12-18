function mouseReleased() {
  if (click == 1) {
    createNewOscillator(mouseX, mouseY)
  }
  if (click == 2) {
    createNewMixer(mouseX, mouseY)
  }
  if (click == 3) {
    createNewVCA(mouseX, mouseY)
  }
  if (click > 99 && click < 200) {
    if (click % 10 == 0) {
      if (mouseX > 700 && mouseX < 800 && mouseY > addButtons[4].y && mouseY < addButtons[4].y + addButtons[4].h) {
        deleteVCO(click)
      }
      else {
        updateVCOPos(mouseX, mouseY, click)
      }
      
    }
  }
  if (click > 199 && click < 300) {
    if (click % 10 == 0) {
      if (mouseX > 700 && mouseX < 800 && mouseY > addButtons[4].y && mouseY < addButtons[4].y + addButtons[4].h) {
        deleteMixer(click)
      }
      else {
        updateMixerPos(mouseX, mouseY, click)
      }
      
    }
  }
    if (click > 299 && click < 400) {
    if (click % 10 == 0) {
      if (mouseX > 700 && mouseX < 800 && mouseY > addButtons[4].y && mouseY < addButtons[4].y + addButtons[4].h) {
        deleteVCA(click)
      }
      else {
        updateVCAPos(mouseX, mouseY, click)
      }
      
    }
  }
  if (click > 999 && click % 10 < 4) {
    createCable()
  }
  
  
  
  click = 0;
}