

var symbolSize = 26;
var myStreams = [];

// MAIN LOOP
function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0));
    myStreams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 150); // clear the old symbols, add opacity, this opacity lets some of the previous frame show through thus causing a blur/mush effect!
  myStreams.forEach(function(stream) {
    stream.render();
  });
}
// END MAIN


function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2,30));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)) // get random hex code for matrix symbol
      );
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(5,11);

  this.generateSymbols = function(x, y) {
    var first = round(random(0,4)) == 1; // has the effect of... about 20% of the time the first symbol will be brighter
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(180, 255, 180);  // brighter RGB value for first symbol in stream for effect
      } else {
        fill(0, 255, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }

}



// cool mouse circle thing
// if (mouseIsPressed) {
//   fill(0);
// } else {
//   fill(255);
// }
// ellipse(mouseX, mouseY, 20, 20);
