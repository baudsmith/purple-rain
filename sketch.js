const RAINDROPS = [];
const UMBRELLA_SIZE = 80;
const HEIGHT = 400;
const WIDTH = 300;
const GROUND_HEIGHT = 350;
let UMBRELLA_IMG;

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
  rect(0, GROUND_HEIGHT, WIDTH, 50);

  RAINDROPS.forEach((drop) => {
    fill(color(210, 145, 255));
    noStroke();
    drop.update();
    drop.display();
  });
  image(UMBRELLA_IMG, mouseX - 40, mouseY - 40, UMBRELLA_SIZE, UMBRELLA_SIZE);
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

    if (this.sie >= 4) fill(102, 51, 153);

    if (
      this.size >= 3 &&
      dist(this.posX, this.posY, mouseX, mouseY) <
        UMBRELLA_SIZE / 2 + this.size / 2
    ) {
      this.splash();
      this.reset();
    }

    if (this.posY > GROUND_HEIGHT) {
      this.size >= 4 && this.splash();
      this.reset();
    }
  }

  splash() {
    push();
    translate(this.posX, this.posY);

    let innerRadius = random(3, 4);
    let outerRadius = random(5, 8);

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
