import { UI } from '..';

const ui = new UI(document.getElementById('container'));
const button = ui.button({
    label: 'Button',
    text: 'Button',
    handler: () => console.log('hi')
});
const numberInput = ui.numberInput({
    label: 'Number input',
    value: 10,
    handler: (v) => console.log(v)
});
