const container = document.createElement('div');

const label = document.createElement('label');
container.appendChild(label);

const input = document.createElement('input');
input.type = 'number';
container.appendChild(input);

const slider = document.createElement('input');
slider.type = 'range';
container.appendChild(slider);

export default container;
