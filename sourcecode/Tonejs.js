let types = ["sawtooth", "square", "sine", "triangle"]

let notes = ["C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6"]

function handleConnect() {
  
  if (click > 999 && click < 1999) {
    if (hover > 1999 && hover < 2999) {
      let oid = floor(click / 10 % 10)
      print(oid)
      VCOs[oid].synth.type = types[click % 10]
      VCOs[oid].synth.frequency.value = notes[VCOs[oid].note]
      VCOs[oid].synth.start()
    }
  }
}