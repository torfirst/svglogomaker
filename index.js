const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;

const { Circle, Triangle, Square } = require('./lib/shapes');

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
