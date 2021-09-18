require('./style.css');
require('./ui-1.css');
require('./ui-2.css');

import { UI } from '..';

const ui1 = new UI(document.getElementById('ui-1'), true);
ui1.input.button({
    label: 'Button',
    text: 'Button',
    handler: () => console.log('button', 'hi'),
    handleOnInit: true
});
ui1.input.number({
    label: 'Number input',
    value: 10,
    handler: (v) => console.log('number', v)
});
const prog = ui1.output.progress({
    label: 'Progress output'
});
ui1.input.range({
    label: 'Range input',
    value: 0,
    min: 0,
    max: 1,
    handler: (v) => {
        prog.value = v;
        console.log('range', v);
    },
    triggerHandlerOnMove: true
});
ui1.input.numberRange({
    label: 'Number/range input',
    value: 10,
    handler: (v: number) => console.log('numberRange', v),
    triggerHandlerOnMove: true,
    min: 0,
    max: 100,
    step: 1
});
const to = ui1.output.text({
    label: 'Text output',
    value: 'foo',
});
const ti = ui1.input.text({
    label: 'Text input',
    value: to.value,
    handler: (v) => {
        to.value = v;
        console.log('text', v);
    }
});
ui1.input.text({
    label: 'Color input',
    type: 'color',
    value: '#ffffff',
    handler: (v) => console.log('color', v)
});
ui1.input.array({
    label: 'vec2 input',
    length: 2,
    value: [1, 2],
    handler: (v) => console.log('array2', v)
});
ui1.input.array({
    label: 'vec3 input',
    length: 3,
    value: [1, 2, 3],
    handler: (v) => console.log('array3', v)
});
ui1.input.select({
    label: 'Selection input',
    optionTexts: ['A', 'B'],
    handler: (v) => console.log('select', v)
});
ui1.input.file({
    label: 'File input',
    text: 'Open',
    multiple: true,
    handler: (v) => console.log('file', v),
    handleOnInit: true
});
ui1.input.checkbox({
    label: 'Checkbox input',
    handler: (v) => console.log('checkbox', v)
});
const body = [...new Array<number>(5)]
    .map((_, i) => [i, i * i, String.fromCharCode(65 + i)]);
const table = ui1.output.table({
    label: 'Table output',
    head: ['index', 'square', 'char'],
    value: body
});
table.setRow(1, ['foo']);
table.setCell(4, 2, 'bar');

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
