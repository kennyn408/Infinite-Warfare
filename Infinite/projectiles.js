
class Projectile {
  constructor(){
    this.r = 10;
    this.x = player.x;
    this.y = player.y - player.r / 2;
    this.speed = 10;
  }

  display(){
    imageMode(CENTER);
    push();
    strokeWeight(1);
    stroke(0, 208, 255);
    fill(255, 255, 255);
    rect(this.x, this.y, 3, 45, this.r, this.r);
    // rect(this.x, this.y, this.r, this.r);
    pop();
  }

  move(){
    this.y -= this.speed;
  }
}
