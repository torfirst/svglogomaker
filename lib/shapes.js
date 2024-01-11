
class Shape {
  constructor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  render() {
    throw new Error('Subclasses must implement the render method');
  }
}

class Circle extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return '<circle cx="150" cy="100" r="80" fill="' + this.getColor() + '" />';
  }
}

class Triangle extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return '<polygon points="150, 18 244, 182 56, 182" fill="' + this.getColor() + '" />';
  }
}

class Square extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return '<rect width="200" height="200" fill="' + this.getColor() + '" />';
  }
}

module.exports = {
  Shape,
  Circle,
  Triangle,
  Square,
};
