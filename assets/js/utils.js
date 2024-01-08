import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';
import { data } from './data.js';

const utils = {
    limparTela() {
        document.getElementById('time-manager').innerHTML = '';
    },

    cameBack() {
        const imagem = document.querySelector('#menu-ajuda > img')

        this.limparTela();

        const estado = imagem.src.split('/').pop() === 'help.svg'
    
        if (estado) {
            imagem.src = './assets/img/back.svg'
            imagem.title = 'Voltar';
        } else {
            imagem.src = './assets/img/help.svg';
            imagem.title = 'Ajuda';
            this.calculateHours();
        }

        return estado
    },

    mimPageHeight(){
        const altura = window.innerHeight;
        const corpo = document.querySelector('body');
        const pagina = document.getElementById('app');

        corpo.style.minHeight = `${altura}px`;
        pagina.style.minHeight = `${altura}px`;
    },

    calculateHours() {
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