import { calc } from "./calculos.js";
import { data } from "./data.js";

export function showResume() {
    const timeManager = document.getElementById('time-manager')

    timeManager.appendChild(createTotalHours())
    timeManager.appendChild(createPeriod())
    createDays(timeManager)
    displayResume()
}
function displayResume() {
    const dataBase = data.getDataBaseJson();

    let totalHours = '00:00';

    Object.keys(dataBase).forEach((day) => {
        const dayPeriod = Object.keys(dataBase[day]);

        let totalPeriod = '00:00';

        dayPeriod.forEach((period) => {
            const { hora } = dataBase[day][period];
            const totalDay = calc.tempoEntreInicioEFim(hora[0], hora[1]);

            const elementId = `#day-${day}-${period}`;
            document.querySelector(elementId).innerHTML = totalDay;

            totalPeriod = calc.somarPeriodosDeTempo(totalPeriod, totalDay);
        });

        const totalDayElementId = `#total-day-${day}`;
        document.querySelector(totalDayElementId).innerHTML = totalPeriod;

        totalHours = calc.somarPeriodosDeTempo(totalHours, totalPeriod);
    });

    document.querySelector('#total-hours').innerHTML = totalHours;
}

function createTotalHours() {
    const divTotal = document.createElement('div')
    divTotal.id = 'total'

    const h2 = document.createElement('h2')
    h2.innerHTML = 'Total de horas: '

    const span = document.createElement('span')
    span.id = 'total-hours'
    span.innerHTML = '00:00'

    h2.appendChild(span)

    divTotal.appendChild(h2)
    return divTotal
}

function createPeriod() {
    const divBase = document.createElement('div')
    divBase.classList.add('period')

    const periodos = [null, 'Manhã', 'Tarde', 'Noite']
    periodos.map((period) => {
        const div = document.createElement('div')
        div.innerHTML = period
        divBase.appendChild(div)
    })
    return divBase
}

function createDays(timeManager) {
    const allDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    allDays.map((day, index) => {
        const days = document.createElement('div')
        days.classList.add('days')

        let cont = 1

        const div = document.createElement('div')
        div.classList.add('day')
        const p = document.createElement('p')
        p.innerHTML = day
        div.appendChild(p)
        days.appendChild(div)

        while (cont < 4) {
            const divHour = document.createElement('div')
            divHour.innerHTML = '00:00'
            divHour.id = 'day-' + (index + 1) + '-' + cont
            days.appendChild(divHour)
            cont++
        }

        timeManager.appendChild(days)

        const totalDay = document.createElement('div')
        totalDay.classList.add('total-day')

        const pTotal = document.createElement('p')
        pTotal.innerHTML = 'Total de ' + day + ': '

        const spanTotal = document.createElement('span')
        spanTotal.innerHTML = '00:00'
        spanTotal.id = 'total-day-' + (index + 1)

        pTotal.appendChild(spanTotal)
        totalDay.appendChild(pTotal)

        timeManager.appendChild(totalDay)
    })
}
