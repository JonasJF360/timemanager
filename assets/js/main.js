import { utils } from './utils.js';
import { addEvent } from './eventButton.js';

(function () {
    // Adiciona ano atual no copyright
    document.getElementById('copy-year').innerHTML = new Date().getFullYear();

    
    addEvent.backInitial();
    addEvent.help();

    // startApp
    utils.calculateHours();

})();

