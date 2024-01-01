export function showResume() {
    const timeManager = document.getElementById('time-manager')

    timeManager.appendChild(createTotalHours())
    timeManager.appendChild(createPeriod())
    createDays(timeManager)
}

function createTotalHours() {
    const divTotal = createElement('div')
    divTotal.id = 'total'

    const h2 = createElement('h2')
    h2.innerHTML = 'Total de horas: '
    
    const span = createElement('span')
    span.id = 'total-hours'
    span.innerHTML = '00:00'

    h2.appendChild(span)

    divTotal.appendChild(h2)
    return divTotal
}

function createPeriod() {
    const divBase = createElement('div')
    divBase.classList.add('period')

    const periodos = [null, 'Manha', 'Tarde', 'Noite']
    periodos.map((period) => {
        const div = createElement('div')
        div.innerHTML = period
        divBase.appendChild(div)
    })
    return divBase
}

function createDays(timeManager) {
    const allDays = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    allDays.map((day, index) => {
        const days = document.createElement('div')
        days.classList.add('days')

        let cont = 1

        const div = createElement('div')
        div.classList.add('day')
        const p = createElement('p')
        p.innerHTML = day
        div.appendChild(p)
        days.appendChild(div)

        while (cont < 4) {
            const divHour = createElement('div')
            divHour.innerHTML = '00:00'
            divHour.id = 'day-' + (index + 1) + '-' + cont
            days.appendChild(divHour)
            cont++
        }

        timeManager.appendChild(days)

        const totalDay = createElement('div')
        totalDay.classList.add('total-day')

        const pTotal = createElement('p')
        pTotal.innerHTML = 'Total de ' + day + ': '

        const spanTotal = createElement('span')
        spanTotal.innerHTML = '00:00'
        spanTotal.id = 'total-day-' + (index + 1)

        pTotal.appendChild(spanTotal)
        totalDay.appendChild(pTotal)

        timeManager.appendChild(totalDay)
    })
}

function createElement(e) {
    return document.createElement(e)
}