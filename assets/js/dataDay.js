import { utils } from './utils.js';
import { data } from './data.js';
import { calc } from './calculos.js';

export function showDataDay(dayId) {
    const [_, day, period] = dayId.split('-');
    utils.cameBack();

    constructDataDay(day, period)

    document.querySelector('#tempo-inicio').addEventListener('input', (e) => {
        e.preventDefault()
        verificarIntervaloDigitado(period)
    })
    document.querySelector('#tempo-final').addEventListener('input', (e) => {
        e.preventDefault()
        verificarIntervaloDigitado(period)
    })
}
function constructDataDay(day, period) {

    const periodAndDay = [
        ['Manhã', 'Tarde', 'Noite'],
        ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    ]

    const dataDay = document.createElement('div')
    dataDay.id = 'data-day'

    const h2 = document.createElement('h2')
    h2.innerHTML = periodAndDay[1][day - 1] + ' - ' + periodAndDay[0][period - 1]
    dataDay.appendChild(h2)

    const divTime = document.createElement('div')
    divTime.id = 'data-day-time'

    divTime.innerHTML =
        `<div class="time-input">
            <label>Início </label>
            <input type="time" step="3600" min="00:00" max="23:59" pattern="[0-2][0-9]:[0-5][0-9]" value="${mostrarDadosExistentes(day, period)[0]}" id="tempo-inicio">
        </div>
        <div class="time-input">
            <label>Fim </label>
            <input type="time" step="3600" min="00:00" max="23:59" pattern="[0-2][0-9]:[0-5][0-9]" value="${mostrarDadosExistentes(day, period)[1]}" id="tempo-final">
        </div>
        <div class="time-input">
            <label>Intervalo </label>
            <input id="intervalo_tempo" type="text" value="${data.getTotalHoursPeriod(day, period)}" disabled>
        </div>`

    dataDay.appendChild(divTime)

    document.querySelector('#time-manager').appendChild(dataDay)
}

function mostrarDadosExistentes(day, period) {
    const initialTime = data.getInitialTime(day, period)
    const finalTime = data.getFinalTime(day, period)

    let primeiroIntervalo = "06:00"
    let segundoItervalo = "07:00"

    if (period == 2) {
        primeiroIntervalo = "12:00"
        segundoItervalo = "13:00"
    }

    if (period == 3) {
        primeiroIntervalo = "18:00"
        segundoItervalo = "19:00"
    }

    if (initialTime !== '00:00' && finalTime !== '00:00') {
        primeiroIntervalo = initialTime
        segundoItervalo = finalTime
    }

    return [primeiroIntervalo, segundoItervalo]
}

function verificarIntervaloDigitado(period) {
    let inicio = document.querySelector('#tempo-inicio').value.split(':').map(num => parseInt(num))
    let fim = document.querySelector('#tempo-final').value.split(':').map(num => parseInt(num))

    let corInput = [true, true]

    if (period == 1) {
        corInput[0] = (inicio[0] < 5 || inicio[0] > 11)
        corInput[1] = (fim[0] < 5 || fim[0] > 11)
    } else if (period == 2) {
        corInput[0] = (inicio[0] < 12 || inicio[0] > 17)
        corInput[1] = (fim[0] < 12 || fim[0] > 17)
    } else {
        corInput[0] = !(inicio[0] < 5 || inicio[0] >= 18)
        corInput[1] = !(fim[0] < 5 || fim[0] >= 18)
    }

    (corInput[0])
        ? document.querySelector('#tempo-inicio').classList.add('tempo-erro')
        : document.querySelector('#tempo-inicio').classList.remove('tempo-erro');

    (corInput[1])
        ? document.querySelector('#tempo-final').classList.add('tempo-erro')
        : document.querySelector('#tempo-final').classList.remove('tempo-erro');


    mudarIntervaloTempo()
}

function mudarIntervaloTempo() {
    let inicio = document.querySelector('#intervalo_tempo')
    inicio.value = calc.tempoEntreInicioEFim(document.querySelector('#tempo-inicio').value, document.querySelector('#tempo-final').value)
}