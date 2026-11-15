const RAINDROPS = [];
const UMBRELLA = 60;
let UMBRELLA_IMG;
const HEIGHT = 400;
const WIDTH = 300;

async function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < 300; i++) {
    RAINDROPS.push(new RainDrop());
  }

  UMBRELLA_IMG = await loadImage('./assets/umbrella.png');

  noCursor();
}

function draw() {
  background(226, 226, 226);

  fill(76, 76, 76);
  rect(0, 350, WIDTH, 50);

  RAINDROPS.forEach((drop) => {
    fill(color(210, 145, 255));
    noStroke();
    drop.update();
    drop.display();
  });
  image(UMBRELLA_IMG, mouseX - 30, mouseY - 30, UMBRELLA, UMBRELLA);
}

class RainDrop {
  constructor() {
    this.posX = random(0, WIDTH);
    this.posY = random(-20, -100);
    this.size = random(2, 5);
  }

  reset() {
    this.posY = random(-5, -50);
  }

  update() {
    this.posY += this.size;

    if (
      this.size >= 3 &&
      dist(this.posX, this.posY, mouseX, mouseY) < UMBRELLA / 2 + this.size / 2
    ) {
      this.splash();
      this.reset();
    }

    if (this.posY > 350) {
      this.size >= 4 && this.splash();
      this.reset();
    }
  }

  splash() {
    push();
    translate(this.posX, this.posY);

    let innerRadius = random(2, 3);
    let outerRadius = random(4, 6);

    beginShape();
    vertex(-outerRadius, -outerRadius);
    vertex(0, -1);
    vertex(outerRadius, -outerRadius);
    vertex(innerRadius, 0);
    vertex(0, innerRadius);
    vertex(-innerRadius, 0);
    endShape(CLOSE);
    pop();
  }

  display() {
    ellipse(
      this.posX,
      this.posY,
      this.size / 2,
      this.size * random(1.25, 1.75)
    );
  }
}
