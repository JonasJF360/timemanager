import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';
import { data } from './data.js';

const utils = {
    limparTela() {
        document.getElementById('time-manager').innerHTML = '';
    },

    cameBack() {
        const voltar = document.querySelector('#menu-ajuda > img')

        this.limparTela();

        const estado = voltar.src.split('/').pop() === 'help.svg'
    
        if (estado) {
            voltar.src = './assets/img/back.svg'
            voltar.title = 'Voltar';
        } else {
            voltar.src = './assets/img/help.svg';
            voltar.title = 'Ajuda';
            this.calcularHoras();
        }

        return estado
    },

    alturaPagina(){
        const corpo = document.querySelector('body');
        const altura = window.innerHeight;
        const pagina = document.getElementById('app');

        corpo.style.minHeight = `${altura}px`;
        pagina.style.minHeight = `${altura}px`;
    },

    calcularHoras() {
        data.startDataBase()
        showResume()
        
        document.querySelectorAll('[id^="day-"]').forEach(day => {
            day.addEventListener('click', () => {
                showDataDay(day.id)
            })
        })

    }
}

export { utils }