
class Lazer {
  constructor(){
    this.r = 50;
    this.x = random(w);
    this.y = 0 - this.r;
    this.speed = 8;
  }

  display(){
    imageMode(CENTER);
    image(lazerImg, this.x, this.y, this.r, this.r)
    // rect(this.x, this.y, this.r, this.r);
  }

  move(){
    this.y += this.speed;
  }
}
