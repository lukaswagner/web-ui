require('./style.css');
require('./ui-1.css');
require('./ui-2.css');

import { UI } from '..';

const ui1 = new UI(document.getElementById('ui-1'));
ui1.input.button({
    label: 'Button', text: 'Button', handler: () => console.log('hi')
});
ui1.input.number({
    label: 'Number input',
    value: 10,
    handler: (v) => console.log(v)
});
ui1.input.range({
    label: 'Range input',
    value: 10,
    handler: (v) => console.log(v),
    triggerHandlerOnMove: true
});
ui1.input.numberRange({
    label: 'Number/range input',
    value: 10,
    handler: (v: number) => console.log(v),
    triggerHandlerOnMove: true,
    min: 0,
    max: 100,
    step: 1
});
const ti = ui1.input.text({
    label: 'Text input',
    value: 'foo',
    handler: (v) => to.value = v
});
const to = ui1.output.text({
    label: 'Text output',
    value: ti.value,
    handler: (v) => console.log(v)
});
ui1.input.text({
    label: 'Color input',
    type: 'color',
    value: '#ffffff',
    handler: (v) => console.log(v)
});
ui1.input.array({
    label: 'vec2 input',
    length: 2,
    value: [1, 2],
    handler: (v) => console.log(v)
});
ui1.input.array({
    label: 'vec3 input',
    length: 3,
    value: [1, 2, 3],
    handler: (v) => console.log(v)
});
ui1.input.select({
    label: 'selection input',
    optionTexts: ['A', 'B'],
    handler: (v) => console.log(v)
})

const ui2 = new UI(document.getElementById('ui-2'));
ui2.input.button({
    label: 'Button',
    text: 'Button'
});
ui2.input.number({
    label: 'Number input'
});
ui2.input.numberRange({
    label: 'Number/range input'
});
