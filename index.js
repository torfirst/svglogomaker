const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;

const { Circle, Triangle, Square } = require('./lib/shapes');

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

class Triangle extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return '<polygon points="150, 18 244, 182 56, 182" fill="' + this.getColor() + '" />';
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

class Square extends Shape {
  constructor(color) {
    super(color);
  }

  render() {
    return '<rect width="200" height="200" fill="' + this.getColor() + '" />';
  }
}

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (color name or hex code):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (color name or hex code):',
    },
  ]);

  return userInput;
}

async function createSVG() {
  try {
    const userInput = await getUserInput();

    let shape;
    switch (userInput.shape.toLowerCase()) {
      case 'circle':
        shape = new Circle(userInput.shapeColor);
        break;
      case 'triangle':
        shape = new Triangle(userInput.shapeColor);
        break;
      case 'square':
        shape = new Square(userInput.shapeColor);
        break;
      default:
        console.error('Invalid shape selection');
        return;
    }

    const text = userInput.text;
    const textColor = userInput.textColor;

    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="100" fill="${textColor}" text-anchor="middle">${text}</text>
    </svg>`;

    await writeFile('logo.svg', svgContent, 'utf-8');
    console.log('Generated logo.svg');
  } catch (error) {
    console.error('Error:', error);
  }
}

createSVG();
