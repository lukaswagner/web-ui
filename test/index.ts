require('./style.css');
require('./ui-1.css');
require('./ui-2.css');

import { UI } from '..';

const ui1 = new UI(document.getElementById('ui-1'));
ui1.button({
    label: 'Button',
    text: 'Button',
    handler: () => console.log('hi')
});
ui1.numberInput({
    label: 'Number input',
    value: 10,
    handler: (v) => console.log(v)
});

const ui2 = new UI(document.getElementById('ui-2'));
ui2.button({
    label: 'Button',
    text: 'Button',
    handler: () => console.log('hi')
});
ui2.numberInput({
    label: 'Number input',
    value: 10,
    handler: (v) => console.log(v)
});
