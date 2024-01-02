import { showResume } from './resume.js';
import { showDataDay } from './dataDay.js';

const utils = {
    limparTela: () => {
        document.getElementById('time-manager').innerHTML = '';
    },

    cameBack() {
        const voltar = document.querySelector('#menu-ajuda > img')
        utils.limparTela();
    
        if (voltar.src.split('/').pop() === 'help.svg') {
            voltar.src = './assets/img/back.svg'
            voltar.title = 'Voltar';
        } else {
            voltar.src = './assets/img/help.svg';
            voltar.title = 'Ajuda';
            utils.calcularHoras();
        }
    
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
                showDataDay(day.id)
            })
        })
    },

    // ## Funções para cálculos para períodos de tempo. ##
    somarPeriodosDeTempo(tempo01, tempo02) {
        let intervalo = [
            tempo01.split(':').map(num => parseInt(num)),
            tempo02.split(':').map(num => parseInt(num))]

        let horas = intervalo[0][0] + intervalo[1][0]
        let minutos = intervalo[0][1] + intervalo[1][1]

        while (minutos > 59) {
            horas++
            minutos -= 60
        }

        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0')
    },

    tempoEntreInicioEFim(horaInicio, horaFim) {
        let inicio = horaInicio.split(':').map(num => parseInt(num))
        let fim = horaFim.split(':').map(num => parseInt(num))

        while (inicio[0] > fim[0]) {
            inicio[0] > 0 ? inicio[0]-- : inicio[0] = 23
            fim[0] > 0 ? fim[0]-- : fim[0] = 23
        }

        let horas = fim[0] - inicio[0]
        let minutos = fim[1] - inicio[1]

        if (minutos < 0) {
            horas--
            minutos += 60
        }
        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0')
    }
}

// const larguraPagina = window.innerWidth;
// const alturaPagina = window.innerHeight;

export { utils }