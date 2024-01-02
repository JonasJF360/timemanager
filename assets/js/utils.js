import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';

const utils = {
    limparTela: () => {
        document.getElementById('time-manager').innerHTML = '';
    },
    alturaPagina: () => {
        const corpo = document.querySelector('body');
        const altura = window.innerHeight;
        const pagina = document.getElementById('app');

        corpo.style.minHeight = `${altura}px`;
        pagina.style.minHeight = `${altura}px`;
    },

    calcularHoras: () => {
        showResume();

        const dayClicked = document.querySelectorAll('[id^="day-"]').forEach(day => {
            day.addEventListener('click', () => {
                utils.limparTela()
                showDataDay(day.id)
            })
        })
    }
}

// const larguraPagina = window.innerWidth;
// const alturaPagina = window.innerHeight;

export { utils }