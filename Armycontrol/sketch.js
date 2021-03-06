var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

function preload() {
  var soldier = loadModel('army1.txt');

}

var players = [];
var general;
var pm = 0;
var all = false;
var xcam = 0;
var ycam = 0;
var zcam = 0;


function setup() {
  // graphics stuff:
  createCanvas(windowWidth, windowHeight, WEBGL);
  //perspective(PI / 3.0, width / height, 0.1, 500);

  for (var i = 0; i < 20; i++) {
    players.push(new player(i + 1))
  }
  // instructions:
  general = new comander()

  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
}

function draw() {
  background(144)
  //camera(0, 0, this.zcam + 400, this.xcam + 50, this.ycam - 200, 0, 0, 1, 0)
  orbitControl();
  normalMaterial();
  for (var i = 0; i < players.length; i++) {
    players[i].display()
  }

  push()
  translate(200 + general.x, 200 + general.y, 800 - general.z)
  sphere(200)
  pop()
  push()
  translate(600 + general.x, 200 + general.y, 800 - general.z)
  cylinder(200)
  pop()


}

function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var mostrecentword = myRec.resultString.split(' ').pop();
  print(int(mostrecentword))

  if (typeof(int(mostrecentword)) != typeof(1)) {
    print("match")
  }
  if (mostrecentword.indexOf("left") !== -1) {
    if (all == true) {
      for (var i = 0; i < players.length; i++) {
        players[i].cx = -players[i].speed
      }
    } else {
      players[pm].cx = -players[pm].speed
    }
  } else if (mostrecentword.indexOf("right") !== -1) {
    if (all == true) {
      for (var i = 0; i < players.length; i++) {
        players[i].cx = players[i].speed
      }
    } else {
      players[pm].cx = players[pm].speed;
    }
  } else if (mostrecentword.indexOf("forward") !== -1) {
    if (all == true) {
      for (var i = 0; i < players.length; i++) {
        players[i].cy = -players[i].speed;
      }
    } else {
      players[pm].cy = -players[pm].speed;
    }
  } else if (mostrecentword.indexOf("backward") !== -1) {
    players[pm].cy = players[pm].speed;
  } else if (mostrecentword.indexOf("stop") !== -1) {
    players[pm].cy = 0;
    players[pm].cx = 0;
  } else if (mostrecentword.indexOf("increase") !== -1) {
    players[pm].speed += 1
  } else if (mostrecentword.indexOf("decrease") !== -1) {
    if (players[pm].speed > 0) {
      players[pm].speed -= 1
    }
  } else if (mostrecentword.indexOf("0") !== -1) {
    pm = 0
  } else if (mostrecentword.indexOf("1") !== -1) {
    pm = 1
  } else if (mostrecentword.indexOf("2") !== -1) {
    pm = 2
  } else if (mostrecentword.indexOf("3") !== -1) {
    pm = 3
  } else if (mostrecentword.indexOf("4") !== -1) {
    pm = 4
  } else if (mostrecentword.indexOf("5") !== -1) {
    pm = 5
  } else if (mostrecentword.indexOf("6") !== -1) {
    pm = 6
  } else if (mostrecentword.indexOf("7") !== -1) {
    pm = 7
  } else if (mostrecentword.indexOf("8") !== -1) {
    pm = 8
  } else if (mostrecentword.indexOf("9") !== -1) {
    pm = 9
  } else if (mostrecentword.indexOf("10") !== -1) {
    pm = 10
  } else if (mostrecentword.indexOf("11") !== -1) {
    pm = 11
  } else if (mostrecentword.indexOf("12") !== -1) {
    pm = 12
  } else if (mostrecentword.indexOf("13") !== -1) {
    pm = 13
  } else if (mostrecentword.indexOf("14") !== -1) {
    pm = 14
  } else if (mostrecentword.indexOf("15") !== -1) {
    pm = 15
  } else if (mostrecentword.indexOf("16") !== -1) {
    pm = 16
  } else if (mostrecentword.indexOf("17") !== -1) {
    pm = 17
  } else if (mostrecentword.indexOf("18") !== -1) {
    pm = 18
  } else if (mostrecentword.indexOf("19") !== -1) {
    pm = 19
  } else if (mostrecentword.indexOf("20") !== -1) {
    pm = 20
  } else if (mostrecentword.indexOf("everyone") !== -1) {
    all = !all
  } else if (mostrecentword.indexOf("clear") !== -1) {
    background(255);
  }
  console.log(pm);
}
class player {
  constructor(id) {
    this.id = id
    this.x = width / 6 + (this.id * 30)
    this.y = 0
    this.z = 0
    this.cx = 0
    this.cy = 0
    this.speed = 1;
    var soldier = loadModel('army1.txt');

  }
  display() {


    this.x += this.cx
    this.z += this.cy
    push()
    translate(this.x + general.x + (this.id * 100), this.y + general.y, this.z + general.z)
    normalMaterial()
    model(soldier)
    pop()



  }

}
class comander {
  constructor() {
    this.x = 0
    this.y = 0
    this.z = 0
    
  }
  display() {



  }


}

function mouseClicked() {
  this.zcam += 1


}
