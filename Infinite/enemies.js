
class Enemy {
  constructor(){
    this.r = 90;
    this.x = random(w);
    this.y = 0 - this.r;
    this.speed = 9;
  }

  display(){
    imageMode(CENTER);
    image(enemyImg, this.x, this.y, this.r, this.r)
    // rect(this.x, this.y, this.r, this.r);
  }

  move(){
    this.y += this.speed;
  }
}
