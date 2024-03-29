import { utils } from './utils.js';
import { showDataDay } from './dataDay.js';
import { data } from './data.js';

export const addEvent = {

    backInitial() {
        utils.changeImage('help', 'Ajuda');
        document.querySelector('#principal').addEventListener('click', (e) => {
            e.preventDefault();
            backPrincipal()
        });
    },
    help() {
        utils.changeImage('help', 'Ajuda');
        document.querySelector('#menu-acoes > img').addEventListener('click', (e) => {
            e.preventDefault();
            helpMenu()
        });
    },

    principal() {
        utils.changeImage('back', 'Voltar');
        document.querySelector('#menu-acoes > img').addEventListener('click', (e) => {
            e.preventDefault();
            backPrincipal()
        });
    },

    dayToPrincipal(day, period) {
        utils.changeImage('back', 'Voltar');
        document.querySelector('#menu-acoes > img').addEventListener('click', (e) => {
            e.preventDefault();
            const note = data.getNote(day, period)
             const list = data.getList(day, period)
            let initialTime = '00:00'
            let finallTime = '00:00'
            if(note || list.length > 0) {
                initialTime = document.querySelector('#tempo-inicio').value
                finallTime = document.querySelector('#tempo-final').value
            }
            data.setInitialTime(day, period, initialTime)
            data.setFinalTime(day, period, finallTime)
            backPrincipal()
        });
    },

    toDay(day, period) {
        utils.changeImage('back', 'Voltar');
        document.querySelector('#menu-acoes > img').addEventListener('click', (e) => {
            e.preventDefault();
            backToDay(day, period)
        });
    },

    toDayAfterSave(day, period) {
        backToDay(day, period)
    }
}

function backToDay(day, period) {
    showDataDay(`day-${day}-${period}`);
    addEvent.dayToPrincipal(day, period);
}

function backPrincipal() {
    utils.limparTela();
    utils.calculateHours()
    addEvent.help();
}

function helpMenu() {
    utils.limparTela();
    showHelpInfo();
    addEvent.principal();
}


function showHelpInfo() {

    const divPrincipal = document.createElement('div');
    divPrincipal.id = 'help';

    const h2 = document.createElement('h2');
    h2.id = 'help-title';
    h2.innerHTML = 'Ajuda / informações';
    divPrincipal.appendChild(h2);

    const h31 = document.createElement('h3');
    h31.innerHTML = 'Sobre a aplicação e seu uso:';
    divPrincipal.appendChild(h31);

    const p1 = document.createElement('p');
    p1.innerHTML = 'Esse é um app para gerenciamento de tempo durante a semana. É para ser simples e fácil de usar. Por padrão, irá armazenar os dados de forma local.<br>Você pode adicionar uma tarefa/atividade para cada dia em seu respectivo período, manhã, tarde ou noite, ou se preferir, apenas uma nota. Você também deve adicionar o tempo que irá se dedicar nessa atividade/tarefa para obter maior eficiência.';
    divPrincipal.appendChild(p1);

    const h32 = document.createElement('h3');
    h32.innerHTML = 'O porque desse app:';
    divPrincipal.appendChild(h32);

    const p2 = document.createElement('p');
    p2.innerHTML = 'Criei esse app para me ajudar a gerenciar meus estudos durante a semana, e assim, além de poder me programar melhor também posso saber quanto tempo estou me dedicando ao que me proponho a fazer.<br>Se de alguma maneira essa aplicação também pode te ajudar, fique a vontade e use da melhor forma.';
    divPrincipal.appendChild(p2);

    const h33 = document.createElement('h3');
    h33.innerHTML = 'Sobre o autor:';
    divPrincipal.appendChild(h33);

    const p3 = document.createElement('p');
    p3.innerHTML = 'Me chamo Jonas de Jesus Ferreira, sou formado em Análise e Desenvolvimento de Sistemas pela Unicesumar.<br>Nas horas vagas gosto de programar, e constantemente estou estudando e me aprimorando com projetos pessoais ou sugeridos, também gosto de conteúdos online que possam agregar valor. Esse é apenas um de meus projetos, e caso quiser saber mais sobre mim e o que estou aprontando, pode me encontrar no GitHub:<br><b><a href="https://github.com/JonasJF360" target="_blank">(https://github.com/JonasJF360)</a></b>.';
    divPrincipal.appendChild(p3);

    document.getElementById('time-manager').appendChild(divPrincipal);
}