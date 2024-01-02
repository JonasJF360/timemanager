import { utils } from './utils.js';
import { helpMenu } from './help.js';

(function () {
    // Adiciona ano atual no copyright
    document.getElementById('copy-year').innerHTML = new Date().getFullYear();

    document.querySelector('#menu-ajuda').addEventListener('click', helpMenu);

    utils.alturaPagina();

    startApp();

})();

function startApp() {
    utils.calcularHoras();
}

