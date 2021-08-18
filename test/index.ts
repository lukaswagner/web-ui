import { UI } from '..';

const ui = new UI(document.getElementById('container'));
const button = ui.button({ text: 'Button', handler: () => console.log('hi') });
