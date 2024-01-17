import { addEvent } from './eventButton.js';
import { data } from './data.js';
import { calc } from './calculos.js';
import { utils } from './utils.js';
import { editNote } from './editNote.js';
import { editList } from './editList.js';

export function showDataDay(dayId) {
    const [_, day, period] = dayId.split('-');
    utils.limparTela();
    addEvent.dayToPrincipal(day, period)

    buildTimeManipulator(day, period)

    document.querySelector('#tempo-inicio').addEventListener('input', (e) => {
        e.preventDefault()
        checkEnteredRange(period)
    })
    document.querySelector('#tempo-final').addEventListener('input', (e) => {
        e.preventDefault()
        checkEnteredRange(period)
    })

    buildDataDay(day, period)

}

function buildDataDay(day, period) {
    const note = data.getNote(day, period)
    const list = data.getList(day, period)

    const divPrincipal = document.getElementById('data-day')

    const divNote = document.createElement('div')
    divNote.id = 'data-day-note'
    const divList = document.createElement('div')
    divList.id = 'data-day-list'

    if (note) {
        divNote.classList.add('note-show')
        showNote(divNote, note)

        divNote.querySelector('p').addEventListener('click', (e) => {
            e.preventDefault()
            editNote(day, period)
        })
    } else {
        divNote.classList.add('note-empty')
        addImage(divNote, 'note')

        divNote.querySelector('img').addEventListener('click', (e) => {
            e.preventDefault()
           editNote(day, period)
        })
    }

    if (list.length > 0) {
        divList.classList.add('list-show')
        showList(divList, list)

        divList.querySelector('ul').addEventListener('click', (e) => {
            e.preventDefault()
            editList(day, period)
        })
    } else {
        divList.classList.add('list-empty')
        addImage(divList, 'list')

        divList.querySelector('img').addEventListener('click', (e) => {
            e.preventDefault()
            editList(day, period)
        })
    }

    divPrincipal.appendChild(divNote)
    divPrincipal.appendChild(divList)
}

function showNote(elementNote, note) {
    elementNote.innerHTML = `<h3>Anotações</h3><p id='data-day-note-text'>${note}</p>`   
}

function showList(elementList, list) {
    elementList.innerHTML = `<h3>Lista de Tarefas</h3><ul>${list.map((item, index) => `<li class='${item[1] ? 'checked' : 'active'}'>${(index + 1).toString().padStart(2, '0')}. ${item[0]}</li>`).join('')}</ul>`    
}

function addImage(e, name) {
    const img = document.createElement('img')
    img.src = `./assets/img/${name}.svg`

    img.title = name === 'note' ? 'Adicionar Nota' : 'Adicionar Lista';

    e.appendChild(img)
}

function buildTimeManipulator(day, period) {

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
            <input type="time" step="3600" min="00:00" max="23:59" pattern="[0-2][0-9]:[0-5][0-9]" value="${showExistingData(day, period)[0]}" id="tempo-inicio">
        </div>
        <div class="time-input">
            <label>Fim </label>
            <input type="time" step="3600" min="00:00" max="23:59" pattern="[0-2][0-9]:[0-5][0-9]" value="${showExistingData(day, period)[1]}" id="tempo-final">
        </div>
        <div class="time-input">
            <label>Intervalo </label>
            <input id="intervalo_tempo" type="text" value="${data.getTotalHoursPeriod(day, period)}" disabled>
        </div>`

    dataDay.appendChild(divTime)

    document.querySelector('#time-manager').appendChild(dataDay)
}

function showExistingData(day, period) {
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

function checkEnteredRange(period) {
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


    changeTimeInterval()
}

function changeTimeInterval() {
    let inicio = document.querySelector('#intervalo_tempo')
    inicio.value = calc.timeBetweenStartAndEnd(document.querySelector('#tempo-inicio').value, document.querySelector('#tempo-final').value)
}