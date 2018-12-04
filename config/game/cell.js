class GameCell {
    constructor (name) {
      this.veggie = name;
      this.hit = false;
      this.miss = false;
      this.harvested = false;
      this.targeted = false;
    }
  }
  
module.exports = GameCell;