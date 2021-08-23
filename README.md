# web-ui

Helper for quickly adding ui elements.

## Usage

```TS
// specify container for ui
const ui = new UI(document.getElementById('ui'));

// create an input element
const input = ui.input.numberRange({
    label: 'Input a number',
    // by default, the slider updates only when the mouse is released (onchange)
    // if you want instant updates (oninput), use this
    triggerHandlerOnMove: true,
    // you can react to changes by defining a handler
    handler: (v) => output.value = v.toString()
});

ui.input.button({
    label: 'Double your number',
    text: 'Go',
    // or you can access an input's value manually
    handler: () => output.value = (input.value * 2).toString()
});

// create an output element
const output = ui.output.text({
    label: 'The result is'
});
```

For an example containing all available elements, see `test/index.ts`. There, you can also find example stylesheets.

## Implemented UI elements

### Inputs

- [x] Button
- [x] Text (plain text, color, email, password, url)
- [x] Number (text, slider, text+slider)
- [x] Number array
- [x] Select
- [x] File
- [x] Checkbox

### Outputs

- [x] Text
- [x] Progress
- [x] Table
