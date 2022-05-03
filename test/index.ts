require('./style.css');
require('./ui-1.css');
require('./ui-2.css');
require('./ui-3.css');

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
    min: 0, max: 1, value: 0,
    handler: (v) => {
        prog.value = v;
        console.log('range', v);
    },
    triggerHandlerOnMove: true
});

ui1.input.numberRange({
    label: 'Number/range input',
    min: 0, max: 100, step: 1, value: 10,
    handler: (v: number) => console.log('numberRange', v),
    triggerHandlerOnMove: true
});

const textOutput = ui1.output.text({
    label: 'Text output',
    value: 'foo',
});
ui1.input.text({
    label: 'Text input',
    value: textOutput.value,
    handler: (v) => {
        textOutput.value = v;
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

const select = ui1.input.select({
    label: 'Selection input',
    optionTexts: ['A', 'B'],
    handler: (v) => console.log('select', v)
});

const files = ui1.input.file({
    label: 'File input',
    text: 'Open',
    multiple: true,
    handler: (v) => console.log('file', v),
    handleOnInit: true
});
ui1.input.button({
    text: 'log files',
    handler: () => {
        console.log(files.value);
    }
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

const preset = {
    'ui1': 123,
    'ui2': 0.5,
    'ui3': 0.5,
    'ui4': 123,
    'ui5': '123',
    'ui6': '123',
    'ui7': '#ff0000',
    'ui8': [123, 456],
    'ui9': [123, 456, 789],
    'ui10': 'B',
    'ui12': true,
    'ui13': [[123]],
};

const buttons = ui1.input.buttonArray({
    buttons: [{
        text: 'reset',
        handler: () => ui1.reset(false),
    }, {
        text: 'apply preset',
        handler: () => ui1.setFromObject(preset, true),
    }, {
        text: 'random default',
        handler: () => {
            prog.default = Math.random();
            prog.reset();
        }
    }, {
        text: 'change select',
        handler: () => {
            select.values = ['C', 'D'];
            select.texts = ['E', 'F'];
        }
    }, {
        text: 'change me',
        handler: () => {
            buttons.elements[4].innerText = 'Done';
            buttons.elements[4].style.setProperty('background', '#bbffbb');
        }
    }]
});

const ui2 = new UI(document.getElementById('ui-2'));

const ui2n = ui2.input.number({
    label: 'Number input'
});
const ui2nr = ui2.input.numberRange({
    label: 'Number/range input'
});
ui2.input.button({
    label: 'Button',
    text: 'Button',
    handler: () => {
        console.log(ui2n.value, ui2nr.value);
    }
});

const ui3 = new UI(document.getElementById('ui-3'), true);
ui3.input.number({
    label: 'handleOnInit test',
    handler: () => console.log('This should not be printed on init.'),
    handleOnInit: false
});
