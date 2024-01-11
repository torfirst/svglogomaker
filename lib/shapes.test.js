const { Circle, Triangle, Square } = require('./shapes');

test('Circle render method', () => {
  const circle = new Circle('red');
  expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="red" />');
});
