let img;
let movers = [];
let canvas2;

function setup() {
  createCanvas(400, 400);
    noStroke();
  fill(250);
  ellipse(200,200,10);
  canvas2 = createGraphics(400, 400);
  img = loadImage('saram.png');
  
  
  xoff = 0;
  yoff = 0;

  for (let i = 0; i < 80; i++) {
    let m = new Mover(random(width), random(height), random(1, 4));
    movers.push(m);
  }
}

function draw() {
  background(50);
  image(canvas2, 0, 0);
  let mousePos = createVector(mouseX, mouseY);

  for (let i = 0; i < movers.length; i++) {
    let m = movers[i];
    m.update();
    m.show();
    m.show2(canvas2);

    if (mouseIsPressed) {
      let f = p5.Vector.sub(mousePos, m.pos);
      f.mult(0.01);
      m.applyForce(f);
    }
  }
}


class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.m = m; 
  }
  
  applyForce(aForce) {
    let f = p5.Vector.div(aForce, this.m);
    this.acc.add(f);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  show() {
    fill(0);
    image(img, this.pos.x, this.pos.y, img.width / 20, img.height / 20);
    //circle(this.pos.x, this.pos.y, this.m);  
     
  }
  
  show2(aCanvas) {
    aCanvas.noStroke();
    aCanvas.fill(random(100,150), random(100,150), random(200,250), 5);
    aCanvas.circle(this.pos.x, this.pos.y, this.vel.mag()*2);
  }
}