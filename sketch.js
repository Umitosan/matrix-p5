
var symbolSize = 26;
var myStreams = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-500, 1000));
    myStreams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
  textStyle(BOLD);
}

// MAIN LOOP
function draw() {
  background(0, 150); // clear the old symbols, add opacity, this opacity lets some of the previous frame show through thus causing a blur/mush effect!
  myStreams.forEach(stream => {
    stream.render();
    stream.drip(); // moves the streams down the screen
    // check bounds and destroy if off screen
    if (stream.inBounds() == false) {
      console.log("stream out of bounds, will be delete");
      var index = myStreams.indexOf(stream);
      myStreams.splice(index, 1);
    }
  });
}



function Symbol(x, y, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.switchInterval = round(random(3,25));
  this.first = first;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)) // get random hex code for matrix symbol
      );
    }
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(6, 30));
  this.fallSpeed = round(random(2,35));

  this.generateSymbols = function(x, y) {
    var first = round(random(0,2)) == 1; // has the effect of... about 20% of the time the first symbol will be brighter
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.drip = function() {
    if (frameCount % this.fallSpeed == 0) {
      this.symbols.forEach(symbol => {
        symbol.y += symbolSize;
      });
    }
  }

  // check the tail symbol to see if on screen
  this.inBounds = function() {
    var bounds = true;
    var tailIndex = this.symbols.length - 3;
    if (this.symbols[tailIndex].y > window.innerHeight) {
      bounds = false;
    }
    return bounds;
  }

  this.render = function() {
    this.symbols.forEach(symbol => {
      if (symbol.first) {
        fill(180, 255, 180);  // brighter RGB value for first symbol in stream for effect
      } else {
        fill(0, 255, 70);
      }
      text(symbol.value, symbol.x, symbol.y);
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
