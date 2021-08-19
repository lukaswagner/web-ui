require('./style.css');
require('./ui-1.css');
require('./ui-2.css');

import { UI } from '..';
import { NumberRangeInputOptions } from '../lib/elements/numberRangeInput';

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
ui1.rangeInput({
    label: 'Range input',
    value: 10,
    handler: (v) => console.log(v),
    triggerHandlerOnMove: true
});
ui1.numberRangeInput({
    label: 'Number/range input',
    value: 10,
    handler: (v: number) => console.log(v),
    triggerHandlerOnMove: true,
    min: 0,
    max: 100,
    step: 1
});

const ui2 = new UI(document.getElementById('ui-2'));
ui2.button({
    label: 'Button',
    text: 'Button'
});
ui2.numberInput({
    label: 'Number input'
});
ui2.numberRangeInput({
    label: 'Number/range input'
});
